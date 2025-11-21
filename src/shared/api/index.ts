import { ROUTES } from "@/shared/config/routes";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export class ApiError extends Error {
    status: number;
    data?: unknown;

    constructor(status: number, message: string, data?: unknown) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.data = data;
    }
}

export const paramsSerializer = (params: Record<string, unknown>) => {
    const searchParams = new URLSearchParams();

    for (const key in params) {
        const value = params[key];
        if (Array.isArray(value)) {
            value.forEach((item, i) => {
                searchParams.append(`${key}[${i}]`, String(item));
            });
        } else if (value !== undefined && value !== null) {
            searchParams.append(key, String(value));
        }
    }

    return searchParams.toString();
};

type RequestOptions = RequestInit & {
    params?: Record<string, unknown>;
    skipAuthRefresh?: boolean;
};

const buildUrl = (path: string, params?: Record<string, unknown>) => {
    let url = `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;

    if (params) {
        const query = paramsSerializer(params);
        if (query) {
            url += `?${query}`;
        }
    }

    return url;
};

let refreshPromise: Promise<Response> | null = null;

const fetchRefresh = () =>
    fetch(buildUrl("/auth/refresh"), {
        method: "GET",
        credentials: "include",
    });

const refreshWithoutRepeats = async () => {
    const localCopy = refreshPromise;
    let response: Response;

    if (localCopy && refreshPromise) {
        response = await refreshPromise;
    } else {
        refreshPromise = fetchRefresh();
        const copy = refreshPromise;
        response = await copy;
        refreshPromise = null;
    }

    if (!response.ok) {
        throw new ApiError(response.status, "Failed to refresh session");
    }

    return response;
};

async function handleResponse<T>(response: Response): Promise<T> {
    if (response.status === 204) {
        return undefined as T;
    }

    const contentType = response.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
        const message =
            (isJson && (data as any)?.message) ||
            (typeof data === "string" ? data : response.statusText);

        throw new ApiError(response.status, message || "Request failed", data);
    }

    return data as T;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { params, skipAuthRefresh, ...fetchOptions } = options;

    const url = buildUrl(path, params);

    const response = await fetch(url, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...(fetchOptions.headers || {}),
        },
        ...fetchOptions,
    });

    if (response.status === 401 && !skipAuthRefresh && !path.includes("/auth/refresh")) {
        try {
            await refreshWithoutRepeats();
            return request<T>(path, { ...options, skipAuthRefresh: true });
        } catch (error) {
            if (
                typeof window !== "undefined" &&
                window.location.pathname !== ROUTES.LOGIN
            ) {
                window.location.href = ROUTES.LOGIN;
            }
            throw error;
        }
    }

    return handleResponse<T>(response);
}

export const instanceApi = {
    get: <T>(path: string, options?: RequestOptions) =>
        request<T>(path, { ...options, method: "GET" }),
    post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
        request<T>(path, {
            ...options,
            method: "POST",
            body: body ? JSON.stringify(body) : undefined,
        }),
    put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
        request<T>(path, {
            ...options,
            method: "PUT",
            body: body ? JSON.stringify(body) : undefined,
        }),
    patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
        request<T>(path, {
            ...options,
            method: "PATCH",
            body: body ? JSON.stringify(body) : undefined,
        }),
    delete: <T>(path: string, options?: RequestOptions) =>
        request<T>(path, { ...options, method: "DELETE" }),
};
