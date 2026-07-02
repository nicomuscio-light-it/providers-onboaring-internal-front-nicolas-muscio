import { Skeleton } from "@/components/ui";

export const ProviderCardSkeleton = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border-default-default bg-background-default-default">
      <Skeleton className="aspect-square rounded-none" />

      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-11 w-full" />
      </div>
    </div>
  );
};
