import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { cn } from "@/lib/utils";
import { type Gender, useClinicOptions, useSpecialtyOptions } from "@/services";
import { FavoritesToggle } from "./favorites-toggle";

const ALL_VALUE = "all";

const GENDER_OPTIONS = [
  { label: "All genders", value: ALL_VALUE },
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

type SelectOption = {
  label: string;
  value: string;
};

type FilterSelectProps = {
  ariaLabel: string;
  className?: string;
  options: SelectOption[];
  value: string;
  onValueChange: (value: string) => void;
};

const FilterSelect = ({
  ariaLabel,
  className,
  onValueChange,
  options,
  value,
}: FilterSelectProps) => {
  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger
        aria-label={ariaLabel}
        className={cn("w-full bg-background-default-secondary py-3", className)}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => {
          return (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export type ProvidersFiltersProps = {
  specialtyId?: number;
  clinicId?: number;
  gender?: Gender;
  isFavoritesActive: boolean;
  favoritesCount: number;
  onSpecialtyChange: (id?: number) => void;
  onClinicChange: (id?: number) => void;
  onGenderChange: (gender?: Gender) => void;
  onToggleFavorites: () => void;
};

export const ProvidersFilters = ({
  clinicId,
  favoritesCount,
  gender,
  isFavoritesActive,
  onClinicChange,
  onGenderChange,
  onSpecialtyChange,
  onToggleFavorites,
  specialtyId,
}: ProvidersFiltersProps) => {
  const specialties = useSpecialtyOptions();
  const clinics = useClinicOptions();

  const specialtyOptions = [
    { label: "All specialties", value: ALL_VALUE },
    ...specialties.map((specialty) => {
      return { label: specialty.name, value: String(specialty.id) };
    }),
  ];

  const clinicOptions = [
    { label: "All clinics", value: ALL_VALUE },
    ...clinics.map((clinic) => {
      return { label: clinic.name, value: String(clinic.id) };
    }),
  ];

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">
      <FilterSelect
        ariaLabel="Filter by specialty"
        className="w-full md:w-48"
        onValueChange={(value) => {
          return onSpecialtyChange(value === ALL_VALUE ? undefined : Number(value));
        }}
        options={specialtyOptions}
        value={specialtyId ? String(specialtyId) : ALL_VALUE}
      />

      <FilterSelect
        ariaLabel="Filter by gender"
        className="w-full md:w-44"
        onValueChange={(value) => {
          return onGenderChange(value === ALL_VALUE ? undefined : (value as Gender));
        }}
        options={GENDER_OPTIONS}
        value={gender ?? ALL_VALUE}
      />

      <FilterSelect
        ariaLabel="Filter by clinic"
        className="w-full md:w-48"
        onValueChange={(value) => {
          return onClinicChange(value === ALL_VALUE ? undefined : Number(value));
        }}
        options={clinicOptions}
        value={clinicId ? String(clinicId) : ALL_VALUE}
      />

      <FavoritesToggle
        count={favoritesCount}
        isActive={isFavoritesActive}
        onToggle={onToggleFavorites}
      />
    </div>
  );
};
