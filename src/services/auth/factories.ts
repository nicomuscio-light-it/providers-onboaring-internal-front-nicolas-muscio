import { createQueryKeys } from "@lukemorales/query-key-factory";

export const queries = createQueryKeys("auth", {});

export const mutations = {
  login: ["auth", "login"] as const,
  signup: ["auth", "signup"] as const,
};
