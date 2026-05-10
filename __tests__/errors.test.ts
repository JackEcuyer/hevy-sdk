import { APIError, NetworkError, ValidationError } from "../src/errors.js";
import { describe, it, expect } from "@jest/globals";

describe("APIError", () => {
  it("should set message and statusCode", () => {
    const err = new APIError("fail", 400);
    expect(err.message).toBe("fail");
    expect(err.statusCode).toBe(400);
    expect(err.name).toBe("APIError");
  });
});

describe("NetworkError", () => {
  it("should set message", () => {
    const err = new NetworkError("netfail");
    expect(err.message).toBe("netfail");
    expect(err.name).toBe("NetworkError");
  });
});

describe("ValidationError", () => {
  it("should format zod errors", () => {
    const fakeZod = { errors: [{ path: ["field"], message: "bad" }] };
    // @ts-expect-error - we are intentionally passing a fake ZodError
    const err = new ValidationError(fakeZod);
    expect(err.message).toContain("Validation failed");
    expect(err.errors[0]).toContain("field: bad");
    expect(err.name).toBe("ValidationError");
  });
});
