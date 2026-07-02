import type { z } from "zod";

import type {
  clinicSchema,
  genderSchema,
  providerSchema,
  providersResponseSchema,
  providersSearchSchema,
  specialtySchema,
} from "./schemas";

export type Gender = z.infer<typeof genderSchema>;

export type Specialty = z.infer<typeof specialtySchema>;

export type Clinic = z.infer<typeof clinicSchema>;

export type Provider = z.infer<typeof providerSchema>;

export type ProvidersResponse = z.infer<typeof providersResponseSchema>;

export type ProvidersSearch = z.infer<typeof providersSearchSchema>;

export type ProvidersListParams = {
  name?: string;
  specialtyId?: number;
  clinicId?: number;
  gender?: Gender;
  favorited?: boolean;
  page?: number;
};
