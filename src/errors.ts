import { ZodError } from "zod";

/**
 * Error thrown when a network or fetch-level error occurs (e.g., DNS failure, no response, CORS error).
 *
 * This is distinct from APIError, which represents errors returned by the API itself.
 *
 * @extends Error
 */
export class NetworkError extends Error {
  /** The error message describing the network error. */
  public message: string;

  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
    this.message = message;
  }
}

/**
 * Error thrown when validation with Zod fails.
 * @extends Error
 */
export class ValidationError extends Error {
  /** An array of formatted error messages from Zod validation. */
  public errors: string[];
  /** The error message describing the validation error. */
  public message: string;

  constructor(error: ZodError) {
    // Format error messages into a single string for readability
    const formatted = error.errors.map(
      (e) => `${e.path.join(".") || "value"}: ${e.message}`,
    );

    const errorMessage = `Validation failed:\n${formatted.join("\n")}`;
    super(errorMessage);

    this.name = "ValidationError";
    this.errors = formatted;
    this.message = errorMessage;
  }
}

/**
 * Error thrown when an API request fails.
 * @extends Error
 */
export class APIError extends Error {
  /** The HTTP status code returned by the API. */
  public statusCode: number;
  /** The error message returned by the API. */
  public message: string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "APIError";
    this.statusCode = statusCode;
    this.message = message;
  }
}
