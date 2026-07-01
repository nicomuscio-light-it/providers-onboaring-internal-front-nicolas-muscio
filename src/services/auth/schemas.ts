import { z } from "zod";

export const signupPayloadSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
});

export const signupSchema = z
  .object({
    name: z.string().min(1, "Full name is required").max(255),
    email: z
      .string()
      .min(1, "Email is required")
      .max(255)
      .pipe(z.email("Enter a valid email address")),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .superRefine((data, ctx) => {
    if (data.confirmPassword && data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });
