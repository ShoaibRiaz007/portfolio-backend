import { ZodError } from "zod";
import { type ApiErrorData } from "../schemas/common";

type ErrorDetails = NonNullable<ApiErrorData["details"]>;

function getErrorDetails(error: unknown): ApiErrorData["details"] {
  if (error instanceof ZodError) {
    return error.issues.reduce<ErrorDetails>((acc, issue) => {
      const key = issue.path.join(".") || "root";
      acc[key] = issue.message;
      return acc;
    }, {});
  }

  if (error && typeof error === "object") {
    const detailsCandidate = (error as { details?: unknown }).details;

    if (detailsCandidate && typeof detailsCandidate === "object" && !Array.isArray(detailsCandidate)) {
      return detailsCandidate as ApiErrorData["details"];
    }
  }

  return undefined;
}

export function normalizeErrorData(error: unknown): ApiErrorData {
  if (error instanceof Error) {
    const withCode = error as Error & { code?: string | number };

    return {
      message: error.message,
      name: error.name,
      code: typeof withCode.code === "string" ? withCode.code : withCode.code?.toString(),
      stack: error.stack,
      details: getErrorDetails(error),
    };
  }

  if (typeof error === "string") {
    return { message: error };
  }

  if (typeof error === "number" || typeof error === "boolean") {
    return { message: String(error) };
  }

  if (error && typeof error === "object") {
    const genericError = error as Record<string, unknown>;
    const messageValue = genericError["message"];
    const nameValue = genericError["name"];
    const codeValue = genericError["code"];

    return {
      message: typeof messageValue === "string" ? messageValue : "Unexpected error",
      name: typeof nameValue === "string" ? nameValue : undefined,
      code: typeof codeValue === "string" || typeof codeValue === "number" ? String(codeValue) : undefined,
      details: getErrorDetails(error),
    };
  }

  return { message: "Unexpected error" };
}
