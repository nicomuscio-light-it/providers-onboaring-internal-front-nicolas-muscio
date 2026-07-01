import type { z } from "zod";

import type { signupPayloadSchema, signupSchema } from "./schemas";

export type SignupFormValues = z.infer<typeof signupSchema>;

export type SignupPayload = z.infer<typeof signupPayloadSchema>;
