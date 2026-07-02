import { useEffect, useState } from "react";

export const useDebounce = <TValue>(value: TValue, delay = 300): TValue => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      return clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
};
