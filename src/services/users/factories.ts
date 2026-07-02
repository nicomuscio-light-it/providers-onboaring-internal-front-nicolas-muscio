import { createQueryKeys } from "@lukemorales/query-key-factory";

export const queries = createQueryKeys("users", {
  detail: (id: number) => {
    return { queryKey: [id] };
  },
});

export const mutations = {};
