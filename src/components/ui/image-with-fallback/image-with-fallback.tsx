import { type ReactNode, useState } from "react";

import { cn } from "@/lib/utils";

export type ImageWithFallbackProps = {
  src: string | null;
  alt: string;
  fallback: ReactNode;
  className?: string;
};

export const ImageWithFallback = ({ alt, className, fallback, src }: ImageWithFallbackProps) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-background-default-secondary text-icon-default-tertiary",
          className,
        )}
      >
        {fallback}
      </div>
    );
  }

  return (
    <img
      alt={alt}
      className={cn("object-cover", className)}
      onError={() => {
        return setHasError(true);
      }}
      src={src}
    />
  );
};
