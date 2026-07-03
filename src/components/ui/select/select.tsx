import { type ComponentProps } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export const Select = SelectPrimitive.Root;

export const SelectValue = SelectPrimitive.Value;

export const SelectTrigger = ({
  children,
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.Trigger>) => {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        "flex items-center justify-between gap-2 rounded-md border border-border-default-default bg-background-default-default px-3 py-2 text-sm text-text-default-default transition-colors outline-none hover:bg-background-default-secondary focus-visible:border-border-brand-default focus-visible:ring-4 focus-visible:ring-background-brand-default/15 disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-text-default-tertiary data-[state=open]:border-border-brand-default [&_svg]:size-4 [&_svg]:shrink-0",
        className,
      )}
      data-slot="select-trigger"
      {...props}
    >
      <span className="min-w-0 flex-1 truncate text-left">{children}</span>
      <SelectPrimitive.Icon asChild>
        <Icons.ChevronDown className="text-icon-default-secondary" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
};

export const SelectScrollUpButton = ({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.ScrollUpButton>) => {
  return (
    <SelectPrimitive.ScrollUpButton
      className={cn(
        "flex cursor-default items-center justify-center py-1 text-icon-default-secondary",
        className,
      )}
      data-slot="select-scroll-up-button"
      {...props}
    >
      <Icons.ChevronUp />
    </SelectPrimitive.ScrollUpButton>
  );
};

export const SelectScrollDownButton = ({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.ScrollDownButton>) => {
  return (
    <SelectPrimitive.ScrollDownButton
      className={cn(
        "flex cursor-default items-center justify-center py-1 text-icon-default-secondary",
        className,
      )}
      data-slot="select-scroll-down-button"
      {...props}
    >
      <Icons.ChevronDown />
    </SelectPrimitive.ScrollDownButton>
  );
};

export const SelectContent = ({
  children,
  className,
  position = "popper",
  ...props
}: ComponentProps<typeof SelectPrimitive.Content>) => {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(
          "relative z-50 max-h-[var(--radix-select-content-available-height)] min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-md border border-border-default-default bg-background-default-default shadow-lg",
          position === "popper" && "min-w-[var(--radix-select-trigger-width)]",
          className,
        )}
        data-slot="select-content"
        position={position}
        sideOffset={4}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
};

export const SelectItem = ({
  children,
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.Item>) => {
  return (
    <SelectPrimitive.Item
      className={cn(
        "relative flex w-full cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-2 text-sm text-text-default-default outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-background-default-secondary data-[state=checked]:bg-background-default-secondary",
        className,
      )}
      data-slot="select-item"
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator>
        <Icons.Check className="text-icon-default-default" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
};
