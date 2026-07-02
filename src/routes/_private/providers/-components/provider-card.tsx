import { Button, Icons, ImageWithFallback } from "@/components/ui";
import type { Provider } from "@/services";
import { FavoriteButton } from "./favorite-button";

export type ProviderCardProps = {
  provider: Provider;
  onViewDetails: () => void;
  onToggleFavorite: () => void;
};

export const ProviderCard = ({ onToggleFavorite, onViewDetails, provider }: ProviderCardProps) => {
  const primaryClinic = provider.clinics[0];
  const additionalLocationsCount = Math.max(provider.clinics.length - 1, 0);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border-default-default bg-background-default-default">
      <div className="relative aspect-square">
        <ImageWithFallback
          alt={provider.name}
          className="size-full"
          fallback={<Icons.Image className="size-12" />}
          src={provider.profilePic}
        />

        <FavoriteButton
          className="absolute top-3 right-3"
          isFavorited={provider.isFavorited}
          onToggle={onToggleFavorite}
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-text-default-default">{provider.name}</h3>
          <p className="text-text-default-secondary">{provider.specialty.name}</p>
        </div>

        {primaryClinic ? (
          <div className="flex flex-col gap-1 text-sm text-text-default-secondary">
            <span className="flex items-center gap-1.5">
              <Icons.MapPin className="shrink-0 text-icon-default-secondary" />
              {primaryClinic.name}
            </span>
            {additionalLocationsCount > 0 ? (
              <span className="pl-6">
                + {additionalLocationsCount} more{" "}
                {additionalLocationsCount === 1 ? "location" : "locations"}
              </span>
            ) : null}
          </div>
        ) : null}

        <Button className="mt-auto w-full" onClick={onViewDetails} size="lg">
          View details
        </Button>
      </div>
    </article>
  );
};
