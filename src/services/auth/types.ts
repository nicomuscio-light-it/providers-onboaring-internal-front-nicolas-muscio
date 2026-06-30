import type { z } from "zod";

import type { signupSchema } from "./schemas";

export type SignupFormValues = z.infer<typeof signupSchema>;

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};
