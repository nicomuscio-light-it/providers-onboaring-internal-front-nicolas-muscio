import { createQueryKeys } from "@lukemorales/query-key-factory";

export const queries = createQueryKeys("auth", {});

export const mutations = {
  signup: ["auth", "signup"] as const,
};
