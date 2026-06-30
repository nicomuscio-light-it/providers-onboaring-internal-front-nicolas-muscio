import { describe, expect, it } from "vitest";

import { signupSchema } from "./schemas";

const validValues = {
  confirmPassword: "password123",
  email: "jane@example.com",
  name: "Jane Doe",
  password: "password123",
};

const messageFor = (input: Record<string, unknown>, field: string) => {
  const result = signupSchema.safeParse(input);

  if (result.success) {
    return undefined;
  }

  return result.error.issues.find((issue) => {
    return issue.path[0] === field;
  })?.message;
};

describe("signupSchema", () => {
  it("accepts a fully valid payload", () => {
    expect(signupSchema.safeParse(validValues).success).toBe(true);
  });

  it("requires a name", () => {
    expect(messageFor({ ...validValues, name: "" }, "name")).toBe("Full name is required");
  });

  it("rejects a malformed email", () => {
    expect(messageFor({ ...validValues, email: "not-an-email" }, "email")).toBe(
      "Enter a valid email address",
    );
  });

  it("rejects a password shorter than 8 characters", () => {
    expect(
      messageFor({ ...validValues, confirmPassword: "short", password: "short" }, "password"),
    ).toBe("Password must be at least 8 characters long");
  });

  it("requires the password confirmation", () => {
    expect(messageFor({ ...validValues, confirmPassword: "" }, "confirmPassword")).toBe(
      "Please confirm your password",
    );
  });

  it("flags a mismatched confirmation on the confirmPassword field", () => {
    expect(messageFor({ ...validValues, confirmPassword: "different123" }, "confirmPassword")).toBe(
      "Passwords do not match",
    );
  });
});
