import { useCallback, useEffect, useMemo, useState } from "react";
import { getRouteApi } from "@tanstack/react-router";

import {
  type Gender,
  type Provider,
  useFavoritesCount,
  useProviders,
  useToggleFavorite,
} from "@/services";
import { ProviderModal } from "./provider-modal";
import { ProvidersFilters } from "./providers-filters";
import { ProvidersResults } from "./providers-results";
import { ProvidersSearch } from "./providers-search";

const routeApi = getRouteApi("/_private/providers/");

export const ProvidersPage = () => {
  const search = routeApi.useSearch();
  const navigate = routeApi.useNavigate();

  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

  const filters = {
    name: search.search,
    specialtyId: search.specialtyId,
    clinicId: search.clinicId,
    gender: search.gender,
    favorited: search.favorited,
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useProviders(filters);
  const { data: favoritesCount = 0 } = useFavoritesCount();
  const { mutate: mutateFavorite } = useToggleFavorite();

  const providers = useMemo(() => {
    return (
      data?.pages.flatMap((page) => {
        return page.data;
      }) ?? []
    );
  }, [data]);
  const total = data?.pages[0]?.meta.total ?? 0;
  const perPage = data?.pages[0]?.meta.perPage ?? 15;
  const loadedPages = data?.pages.length ?? 0;
  const targetPage = search.page ?? 1;

  // Restore scroll depth from the URL: fetch pages until we've loaded up to ?page=N.
  useEffect(() => {
    if (!isLoading && !isFetchingNextPage && hasNextPage && loadedPages < targetPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, loadedPages, targetPage]);

  // Reflect the loaded depth back into the URL as the user scrolls forward.
  useEffect(() => {
    if (loadedPages > targetPage) {
      navigate({
        replace: true,
        search: (prev) => {
          return { ...prev, page: loadedPages };
        },
      });
    }
  }, [loadedPages, navigate, targetPage]);

  const handleSearchChange = useCallback(
    (value: string) => {
      navigate({
        search: (prev) => {
          if (value === (prev.search ?? "")) {
            return prev;
          }

          return { ...prev, search: value || undefined, page: undefined };
        },
      });
    },
    [navigate],
  );

  const handleSpecialtyChange = (specialtyId?: number) => {
    navigate({
      search: (prev) => {
        return { ...prev, specialtyId, page: undefined };
      },
    });
  };

  const handleClinicChange = (clinicId?: number) => {
    navigate({
      search: (prev) => {
        return { ...prev, clinicId, page: undefined };
      },
    });
  };

  const handleGenderChange = (gender?: Gender) => {
    navigate({
      search: (prev) => {
        return { ...prev, gender, page: undefined };
      },
    });
  };

  const handleToggleFavorites = () => {
    navigate({
      search: (prev) => {
        return { ...prev, favorited: prev.favorited ? undefined : true, page: undefined };
      },
    });
  };

  const handleToggleFavorite = useCallback(
    (provider: Provider) => {
      mutateFavorite({ id: provider.id, favorited: !provider.isFavorited });
    },
    [mutateFavorite],
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-text-default-default md:text-3xl">
          Healthcare Providers
        </h1>
        <p className="text-text-default-secondary">
          Find and connect with healthcare professionals in your area
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <ProvidersSearch
          defaultValue={search.search ?? ""}
          onDebouncedChange={handleSearchChange}
        />

        <ProvidersFilters
          clinicId={search.clinicId}
          favoritesCount={favoritesCount}
          gender={search.gender}
          isFavoritesActive={Boolean(search.favorited)}
          onClinicChange={handleClinicChange}
          onGenderChange={handleGenderChange}
          onSpecialtyChange={handleSpecialtyChange}
          onToggleFavorites={handleToggleFavorites}
          specialtyId={search.specialtyId}
        />
      </div>

      <ProvidersResults
        hasNextPage={hasNextPage}
        isFavoritesActive={Boolean(search.favorited)}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
        onLoadMore={fetchNextPage}
        onToggleFavorite={handleToggleFavorite}
        onViewDetails={setSelectedProvider}
        perPage={perPage}
        providers={providers}
        total={total}
      />

      <ProviderModal
        onClose={() => {
          return setSelectedProvider(null);
        }}
        provider={selectedProvider}
      />
    </div>
  );
};
