import {
  type InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { getProviders, toggleFavorite } from "./api";
import { CLINICS, SPECIALTIES } from "./constants";
import { mutations, queries } from "./factories";
import type { Clinic, ProvidersListParams, ProvidersResponse, Specialty } from "./types";

type ProvidersFilters = Omit<ProvidersListParams, "page">;

export const useProviders = (filters: ProvidersFilters) => {
  return useInfiniteQuery({
    queryKey: queries.list(filters).queryKey,
    queryFn: ({ pageParam }) => {
      return getProviders({ ...filters, page: pageParam });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { currentPage, lastPage: totalPages } = lastPage.meta;

      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
};

export const useFavoritesCount = () => {
  return useQuery({
    queryKey: queries.favoritesCount.queryKey,
    queryFn: () => {
      return getProviders({ favorited: true, page: 1 }).then((response) => {
        return response.meta.total;
      });
    },
  });
};

type ToggleFavoriteVariables = {
  id: number;
  favorited: boolean;
};

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutations.toggleFavorite,
    mutationFn: ({ favorited, id }: ToggleFavoriteVariables) => {
      return toggleFavorite(id, favorited);
    },
    onMutate: async ({ favorited, id }) => {
      await queryClient.cancelQueries({ queryKey: queries.list._def });

      const previousLists = queryClient.getQueriesData<InfiniteData<ProvidersResponse>>({
        queryKey: queries.list._def,
      });

      queryClient.setQueriesData<InfiniteData<ProvidersResponse>>(
        { queryKey: queries.list._def },
        (current) => {
          if (!current) {
            return current;
          }

          return {
            ...current,
            pages: current.pages.map((page) => {
              return {
                ...page,
                data: page.data.map((provider) => {
                  return provider.id === id ? { ...provider, isFavorited: favorited } : provider;
                }),
              };
            }),
          };
        },
      );

      return { previousLists };
    },
    onError: (_error, _variables, context) => {
      context?.previousLists.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queries.list._def });
      queryClient.invalidateQueries({ queryKey: queries.favoritesCount.queryKey });
    },
  });
};

// Hardcoded until the backend exposes specialty/clinic list endpoints; swap the
// return for a useQuery without touching the filters component. See constants.ts.
export const useSpecialtyOptions = (): Specialty[] => {
  return SPECIALTIES;
};

export const useClinicOptions = (): Pick<Clinic, "id" | "name">[] => {
  return CLINICS;
};
