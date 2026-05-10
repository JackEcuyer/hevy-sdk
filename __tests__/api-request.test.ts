import { APIRequest } from "../src/api-request.js";
import { describe, beforeEach, it, expect, jest } from "@jest/globals";

// Explicitly type global.fetch as a jest mocked function
global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

describe("APIRequest", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should send a GET request and return JSON", async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
      new Response(JSON.stringify({ data: 123 }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    const result = await APIRequest("/url", "GET", null, "key");
    expect(result).toEqual({ data: 123 });
    expect(fetch).toHaveBeenCalled();
  });

  it("should throw NetworkError on fetch failure", async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(
      new Error("fail"),
    );
    await expect(APIRequest("/url", "GET", null, "key")).rejects.toThrow(
      "fail",
    );
  });

  it("should throw APIError on non-ok response with JSON error", async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
      new Response(JSON.stringify({ error: "bad" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
        statusText: "Bad Request",
      }),
    );
    await expect(APIRequest("/url", "GET", null, "key")).rejects.toThrow("bad");
  });

  it("should throw APIError on non-ok response with text error", async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
      new Response("not found", {
        status: 404,
        statusText: "Not Found",
      }),
    );
    await expect(APIRequest("/url", "GET", null, "key")).rejects.toThrow(
      "not found",
    );
  });
});
