import { useEffect, useState } from "react";

import { Icons, Input } from "@/components/ui";
import { useDebounce } from "@/hooks";

export type ProvidersSearchProps = {
  defaultValue: string;
  onDebouncedChange: (value: string) => void;
};

export const ProvidersSearch = ({ defaultValue, onDebouncedChange }: ProvidersSearchProps) => {
  const [value, setValue] = useState(defaultValue);
  const debouncedValue = useDebounce(value, 400);

  useEffect(() => {
    onDebouncedChange(debouncedValue);
  }, [debouncedValue, onDebouncedChange]);

  return (
    <div className="relative">
      <Icons.Search className="pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2 text-icon-default-secondary" />
      <Input
        aria-label="Search providers by name"
        className="bg-background-default-secondary py-3 pl-10"
        onChange={(event) => {
          return setValue(event.target.value);
        }}
        placeholder="Search providers by name..."
        type="search"
        value={value}
      />
    </div>
  );
};
