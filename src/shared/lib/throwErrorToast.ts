import { ApiError } from "@/shared/api";
import { customShowNotification } from "./customNotifications";

const isHtmlString = (value: unknown): value is string =>
    typeof value === "string" &&
    /^\s*(<!doctype html|<html[\s>])/i.test(value) &&
    /<\/html>\s*$/i.test(value);

const DEFAULT_MESSAGE = "Something went wrong";

export const throwErrorToast = (error: unknown) => {
    let errorMessage: string | string[] = DEFAULT_MESSAGE;

    if (error instanceof ApiError && !isHtmlString(error.data)) {
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
