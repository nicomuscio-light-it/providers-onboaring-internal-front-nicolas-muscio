import { noSearchResult } from "@/assets/images";
import { Icons } from "@/components/ui";

export type ProvidersEmptyStateProps = {
  variant: "no-results" | "no-favorites";
};

const COPY = {
  "no-results": {
    title: "No providers found matching your search.",
    subtitle: "Try adjusting your filters.",
  },
  "no-favorites": {
    title: "You haven't added any favorites yet.",
    subtitle: "Tap the heart on a provider to save them here.",
  },
} as const;

export const ProvidersEmptyState = ({ variant }: ProvidersEmptyStateProps) => {
  const { subtitle, title } = COPY[variant];

  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      {variant === "no-results" ? (
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
