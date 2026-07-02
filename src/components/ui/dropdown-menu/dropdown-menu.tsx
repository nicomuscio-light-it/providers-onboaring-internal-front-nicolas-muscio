import { type ComponentProps } from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

import { cn } from "@/lib/utils";

export const DropdownMenu = (props: ComponentProps<typeof DropdownMenuPrimitive.Root>) => {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
};

export const DropdownMenuTrigger = ({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Trigger>) => {
  return (
    <DropdownMenuPrimitive.Trigger
      className={cn(
        "outline-none focus-visible:ring-4 focus-visible:ring-background-brand-default/15",
        className,
      )}
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
};

export const DropdownMenuContent = ({
  className,
  sideOffset = 8,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Content>) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        className={cn(
          "z-50 min-w-40 overflow-hidden rounded-md border border-border-default-default bg-background-default-default p-1 shadow-lg",
          className,
        )}
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
};

export const DropdownMenuItem = ({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Item>) => {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-text-default-default outline-none select-none data-[highlighted]:bg-background-default-secondary [&_svg]:size-4",
        className,
      )}
      data-slot="dropdown-menu-item"
      {...props}
    />
  );
};

export const DropdownMenuLabel = ({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Label>) => {
  return (
    <DropdownMenuPrimitive.Label
      className={cn("px-2 py-1.5 text-sm", className)}
      data-slot="dropdown-menu-label"
      {...props}
    />
  );
};

export const DropdownMenuSeparator = ({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Separator>) => {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn("-mx-1 my-1 h-px bg-border-default-default", className)}
      data-slot="dropdown-menu-separator"
      {...props}
    />
  );
};
