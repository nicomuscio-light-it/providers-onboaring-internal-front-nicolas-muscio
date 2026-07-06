import { noSearchResult } from "@/assets/images";
import { Icons } from "@/components/ui";

export const PROVIDERS_EMPTY_STATE_VALUES = {
  NO_RESULTS: "no-results",
  NO_FAVORITES: "no-favorites",
} as const;

type ProvidersEmptyStateValue =
  (typeof PROVIDERS_EMPTY_STATE_VALUES)[keyof typeof PROVIDERS_EMPTY_STATE_VALUES];

const COPY: Record<ProvidersEmptyStateValue, { title: string; subtitle: string }> = {
  [PROVIDERS_EMPTY_STATE_VALUES.NO_RESULTS]: {
    title: "No providers found matching your search.",
    subtitle: "Try adjusting your filters.",
  },
  [PROVIDERS_EMPTY_STATE_VALUES.NO_FAVORITES]: {
    title: "You haven't added any favorites yet.",
    subtitle: "Tap the heart on a provider to save them here.",
  },
};

type ProvidersEmptyStateProps = {
  variant: ProvidersEmptyStateValue;
};

export const ProvidersEmptyState = ({ variant }: ProvidersEmptyStateProps) => {
  const { subtitle, title } = COPY[variant];

  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      {variant === PROVIDERS_EMPTY_STATE_VALUES.NO_RESULTS ? (
        <img alt="" className="w-44" src={noSearchResult} />
      ) : (
        <div className="flex size-20 items-center justify-center rounded-full bg-background-default-secondary text-icon-default-tertiary [&_svg]:size-9">
          <Icons.Heart />
        </div>
      )}

      <div className="flex flex-col gap-1">
        <p className="text-text-default-default">{title}</p>
        <p className="text-text-default-secondary">{subtitle}</p>
      </div>
    </div>
  );
};
