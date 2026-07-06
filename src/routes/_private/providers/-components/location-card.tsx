import { Button, Icons } from "@/components/ui";
import { buildClinicMapsUrl, type Clinic } from "@/services";

export type LocationCardProps = {
  clinic: Clinic;
};

export const LocationCard = ({ clinic }: LocationCardProps) => {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border-default-default p-4">
      <div className="flex flex-col gap-0.5 text-sm text-text-default-secondary">
        <span className="font-medium text-text-default-default">{clinic.name}</span>
        <span>{clinic.address}</span>
        <span>
          {clinic.city}, {clinic.state} {clinic.zipCode}
        </span>
        <span>{clinic.phone}</span>
      </div>

      <Button
        className="w-full"
        onClick={() => {
          return window.open(buildClinicMapsUrl(clinic), "_blank", "noopener");
        }}
        variant="outline"
      >
        <Icons.MapPin />
        View on Google Maps
      </Button>
    </div>
  );
};
