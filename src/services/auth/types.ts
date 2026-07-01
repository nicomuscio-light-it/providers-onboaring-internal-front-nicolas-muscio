import type { z } from "zod";

import type {
  loginPayloadSchema,
  loginResponseSchema,
  loginSchema,
  signupPayloadSchema,
  signupSchema,
} from "./schemas";

export type LoginFormValues = z.infer<typeof loginSchema>;

export type LoginPayload = z.infer<typeof loginPayloadSchema>;

export type LoginResponse = z.infer<typeof loginResponseSchema>;

export type SignupFormValues = z.infer<typeof signupSchema>;

export type SignupPayload = z.infer<typeof signupPayloadSchema>;
