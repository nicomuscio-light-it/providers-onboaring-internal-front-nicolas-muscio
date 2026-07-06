import { type ComponentProps } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

export const Tabs = ({ className, ...props }: ComponentProps<typeof TabsPrimitive.Root>) => {
  return (
    <TabsPrimitive.Root className={cn("flex flex-col", className)} data-slot="tabs" {...props} />
  );
};

export const TabsList = ({ className, ...props }: ComponentProps<typeof TabsPrimitive.List>) => {
  return (
    <TabsPrimitive.List
      className={cn("flex gap-1 rounded-full bg-background-default-secondary p-1", className)}
      data-slot="tabs-list"
      {...props}
    />
  );
};

export const TabsTrigger = ({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Trigger>) => {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-text-default-secondary transition-colors outline-none focus-visible:ring-4 focus-visible:ring-background-brand-default/15 data-[state=active]:bg-background-brand-default data-[state=active]:text-text-brand-on-brand [&_svg]:size-4",
        className,
      )}
      data-slot="tabs-trigger"
      {...props}
    />
  );
};

export const TabsContent = ({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Content>) => {
  return (
    <TabsPrimitive.Content
      className={cn(
        "outline-none focus-visible:ring-4 focus-visible:ring-background-brand-default/15",
        className,
      )}
      data-slot="tabs-content"
      {...props}
    />
  );
};
