import type { Clinic } from "@/services";
import { LocationCard } from "./location-card";

export type ProviderLocationsProps = {
  clinics: Clinic[];
};

export const ProviderLocations = ({ clinics }: ProviderLocationsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-semibold text-text-default-default">Locations</h3>
      {clinics.map((clinic) => {
        return <LocationCard clinic={clinic} key={clinic.id} />;
      })}
    </div>
  );
};
