import { toast } from "react-toastify";

export interface ApiErrorResponse {
  data?: {
    message?: string;
    error?: string;
  };
  message?: string;
  error?: string;
  status?: number;
}

function getErrorMessage(err: ApiErrorResponse, defaultMessage: string) {
  return err?.data?.message ?? err?.message ?? defaultMessage;
}

function getErrorType(err: ApiErrorResponse) {
  return err?.data?.error ?? err?.error ?? "Bad Request";
}

export function ApiError(err: ApiErrorResponse, defaultMessage = "An error occurred") {
  const errorMessage = getErrorMessage(err, defaultMessage);
  const errorType = getErrorType(err);
  toast.error(`${errorType}: ${errorMessage}`);
}