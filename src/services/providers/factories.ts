import { createQueryKeys } from "@lukemorales/query-key-factory";

import type { ProvidersListParams } from "./types";

export const queries = createQueryKeys("providers", {
  list: (filters: Omit<ProvidersListParams, "page">) => {
    return { queryKey: [filters] };
  },
  favoritesCount: null,
});

export const mutations = {
  toggleFavorite: ["providers", "toggle-favorite"] as const,
};
