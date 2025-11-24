import { ApiError } from "@/shared/api";
import { customShowNotification } from "./customNotifications";

const DEFAULT_MESSAGE = "Something went wrong";

export const throwErrorToast = (error: unknown) => {
    let errorMessage: string | string[] = DEFAULT_MESSAGE;

    if (error instanceof ApiError) {
        errorMessage = error.message || DEFAULT_MESSAGE;
    }

    if (Array.isArray(errorMessage)) {
        errorMessage = errorMessage.join(";\n");
    }

    customShowNotification({
        id: "api-error",
        title: "Error occurred",
        message: errorMessage,
        color: "red",
    });
};
