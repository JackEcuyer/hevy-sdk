import { APIError, NetworkError } from "./errors.js";

/*
 * A utility function for making HTTP requests to the API.
 * This function simplifies the process of sending requests by handling common
 * configurations such as setting headers (e.g., API key) and converting data
 * to JSON format.
 */
export const APIRequest = async <T>(
  url: string,
  method: string = "GET",
  data: unknown | null = null,
  apiKey: string,
): Promise<T> => {
  // Setup request configuration
  const config: RequestInit = {
    method,
    headers: {
      accept: "application/json",
      "API-Key": apiKey,
    },
  };

  // If there is data (for POST/PUT), add it to the request body
  if (data) {
    config.body = JSON.stringify(data);
    // Ensure content type header is added when request contains a payload
    (config.headers as Record<string, string>)["Content-Type"] =
      "application/json";
  }

  let response: Response;
  try {
    response = await fetch(url, config);
  } catch (err) {
    // Handle network or fetch errors
    throw new NetworkError(
      err instanceof Error ? err.message : "Network error",
    );
  }

  // Check if the response is successful (status 2xx)
  if (!response.ok) {
    let errorMessage: string;

    // Initially parse response as text to cater for certain error messages that are not returned in JSON format
    const responseText = await response.text();

    // Attempt to parse response text as JSON
    try {
      const errorJSON = JSON.parse(responseText);
      // Successfully parsed as JSON, error message will be in the "error" property
      errorMessage = errorJSON.error || response.statusText;
    } catch {
      // Failed to parse as JSON, error must be plain response text
      errorMessage = responseText || response.statusText;
    }

    // Unsuccessful response, handle errors
    throw new APIError(errorMessage, response.status);
  }

  // Return the parsed JSON response
  const responseData = await response.json();
  return responseData as T;
};
