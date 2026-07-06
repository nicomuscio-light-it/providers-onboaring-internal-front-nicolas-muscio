import { z } from "zod";

export const genderSchema = z.enum(["male", "female", "other"]);

export const specialtySchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const clinicSchema = z.object({
  id: z.number(),
  name: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  phone: z.string(),
});

export const providerSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  gender: genderSchema,
  about: z.string(),
  languages: z.array(z.string()),
  profilePic: z.string().nullable(),
  specialty: specialtySchema,
  clinics: z.array(clinicSchema),
  isFavorited: z.boolean(),
});

const paginationMetaSchema = z.object({
  currentPage: z.number(),
  lastPage: z.number(),
  perPage: z.number(),
  total: z.number(),
});

export const providersResponseSchema = z.object({
  data: z.array(providerSchema),
  meta: paginationMetaSchema,
});

export const providersSearchSchema = z.object({
  search: z.string().optional().catch(undefined),
  specialtyId: z.coerce.number().int().positive().optional().catch(undefined),
  clinicId: z.coerce.number().int().positive().optional().catch(undefined),
  gender: genderSchema.optional().catch(undefined),
  favorited: z.literal(true).optional().catch(undefined),
  page: z.coerce.number().int().positive().optional().catch(undefined),
});
