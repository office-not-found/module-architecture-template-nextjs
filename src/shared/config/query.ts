import { QueryClient } from "@tanstack/react-query";
import { throwErrorToast } from "../lib";
import { ApiError } from "../api";

export const enum EQueryKeys {
    AUTH = "auth",
    ACCOUNT = "account",
}

const isAuthError = (error: unknown) => error instanceof ApiError && error.status === 401;

export const queryClient = new QueryClient({
    defaultOptions: {
        mutations: {
            onError: (error) => {
                if (!isAuthError(error)) throwErrorToast(error);
            },
        },
        queries: {
            placeholderData: (previousData: unknown) => previousData,
            staleTime: 60 * 1000,
            gcTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
            retry: (failureCount, error) => {
                if (isAuthError(error)) {
                    return false;
                }

                return failureCount <= 1;
            },
            throwOnError: (error) => {
                if (!isAuthError(error)) throwErrorToast(error);

                return false;
            },
        },
    },
});
