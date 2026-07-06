import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Icons,
  ImageWithFallback,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import type { Provider } from "@/services";
import { ProviderLocations } from "./provider-locations";
import { ProviderOverview } from "./provider-overview";

export type ProviderModalProps = {
  provider: Provider | null;
  onClose: () => void;
};

export const ProviderModal = ({ onClose, provider }: ProviderModalProps) => {
  // Retain the last provider so its content stays visible during the close
  // animation (the parent clears `provider` immediately on close).
  const [displayedProvider, setDisplayedProvider] = useState<Provider | null>(provider);

  useEffect(() => {
    if (provider) {
      setDisplayedProvider(provider);
    }
  }, [provider]);

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
      open={provider !== null}
    >
      <DialogContent
        aria-describedby={undefined}
        className="flex max-h-[624px] flex-col overflow-hidden p-0 md:max-h-[546px]"
      >
        <DialogTitle className="sr-only">
          {displayedProvider?.name ?? "Provider details"}
        </DialogTitle>

        {displayedProvider ? (
          <Tabs
            className="flex min-h-0 flex-col"
            defaultValue="overview"
            key={displayedProvider.id}
          >
            <div className="flex flex-col gap-4 p-6 pb-4">
              <div className="flex items-center gap-4">
                <ImageWithFallback
                  alt={displayedProvider.name}
                  className="size-16 shrink-0 rounded-xl"
                  fallback={<Icons.User className="size-7" />}
                  src={displayedProvider.profilePic}
                />

                <div className="flex flex-col gap-1">
                  <h2 className="text-2xl font-semibold text-text-default-default">
                    {displayedProvider.name}
                  </h2>
                  <p className="text-text-default-secondary">{displayedProvider.specialty.name}</p>
                </div>
              </div>

              <TabsList>
                <TabsTrigger value="overview">
                  <Icons.User />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="locations">
                  <Icons.MapPin />
                  Locations
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-6">
              <TabsContent value="overview">
                <ProviderOverview provider={displayedProvider} />
              </TabsContent>

              <TabsContent value="locations">
                <ProviderLocations clinics={displayedProvider.clinics} />
              </TabsContent>
            </div>
          </Tabs>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};
