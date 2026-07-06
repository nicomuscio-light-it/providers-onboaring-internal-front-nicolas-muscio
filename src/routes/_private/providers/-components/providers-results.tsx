import { memo, useEffect, useRef } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";

import type { Provider } from "@/services";
import { ProviderCard } from "./provider-card";
import { ProviderCardSkeleton } from "./provider-card-skeleton";
import { EMPTY_STATE_VARIANT, ProvidersEmptyState } from "./providers-empty-state";

const SKELETON_COUNT = 6;

const GRID_CLASSNAME = "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3";

const STAGGER_STEP = 0.05;

export type ProvidersResultsProps = {
  providers: Provider[];
  total: number;
  perPage: number;
  initialPage: number;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  isFavoritesActive: boolean;
  onLoadMore: () => void;
  onViewDetails: (provider: Provider) => void;
  onToggleFavorite: (provider: Provider) => void;
};

export const ProvidersResults = memo(
  ({
    hasNextPage,
    initialPage,
    isFavoritesActive,
    isFetchingNextPage,
    isLoading,
    onLoadMore,
    onToggleFavorite,
    onViewDetails,
    perPage,
    providers,
    total,
  }: ProvidersResultsProps) => {
    // Staggered entrance (cascades within each page batch); exit stays quick and
    // FLIP/layout stays delay-free so reordering feels responsive.
    const cardVariants: Variants = {
      hidden: { opacity: 0, scale: 0.98 },
      visible: (index: number) => {
        return {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.25, delay: (index % perPage) * STAGGER_STEP },
        };
      },
      exit: { opacity: 0, scale: 0.98, transition: { duration: 0.15 } },
    };
    const sentinelRef = useRef<HTMLDivElement>(null);
    const initialPageCardRef = useRef<HTMLDivElement>(null);
    const hasScrolledToInitialPageRef = useRef(false);
    const initialPageStartIndex = (initialPage - 1) * perPage;

    useEffect(() => {
      const sentinel = sentinelRef.current;

      if (!sentinel || !hasNextPage) {
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && !isFetchingNextPage) {
          onLoadMore();
        }
      });

      observer.observe(sentinel);

      return () => {
        return observer.disconnect();
      };
    }, [hasNextPage, isFetchingNextPage, onLoadMore]);

    // On reload with ?page=N, scroll to the first card of that page once its
    // pages have been restored.
    useEffect(() => {
      if (hasScrolledToInitialPageRef.current || initialPage <= 1) {
        return;
      }

      if (providers.length > initialPageStartIndex && initialPageCardRef.current) {
        initialPageCardRef.current.scrollIntoView({ block: "start" });
        hasScrolledToInitialPageRef.current = true;
      }
    }, [initialPage, initialPageStartIndex, providers.length]);

    if (isLoading) {
      return (
        <div className={GRID_CLASSNAME}>
          {Array.from({ length: SKELETON_COUNT }).map((_, index) => {
            return <ProviderCardSkeleton key={index} />;
          })}
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-text-default-secondary">
          {total} {total === 1 ? "provider" : "providers"} found
        </p>

        {providers.length === 0 ? (
          <ProvidersEmptyState
            variant={
              isFavoritesActive ? EMPTY_STATE_VARIANT.NO_FAVORITES : EMPTY_STATE_VARIANT.NO_RESULTS
            }
          />
        ) : (
          <>
            <div className={GRID_CLASSNAME}>
              <AnimatePresence mode="popLayout">
                {providers.map((provider, index) => {
                  return (
                    <motion.div
                      animate="visible"
                      className="h-full scroll-mt-24"
                      custom={index}
                      exit="exit"
                      initial="hidden"
                      key={provider.id}
                      ref={index === initialPageStartIndex ? initialPageCardRef : undefined}
                      transition={{ layout: { duration: 0.2, ease: "easeOut" } }}
                      variants={cardVariants}
                      layout
                    >
                      <ProviderCard
                        onToggleFavorite={() => {
                          return onToggleFavorite(provider);
                        }}
                        onViewDetails={() => {
                          return onViewDetails(provider);
                        }}
                        provider={provider}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {isFetchingNextPage ? (
              <div className={GRID_CLASSNAME}>
                {Array.from({ length: 3 }).map((_, index) => {
                  return <ProviderCardSkeleton key={index} />;
                })}
              </div>
            ) : null}

            <div ref={sentinelRef} />
          </>
        )}
      </div>
    );
  },
);

ProvidersResults.displayName = "ProvidersResults";
