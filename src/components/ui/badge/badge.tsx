import { type ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const badgeVariants = tv({
  base: "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-medium",
  variants: {
    variant: {
      onBrand: "bg-background-default-default text-text-default-default",
      neutral: "bg-background-default-secondary text-text-default-default",
    },
  },
  defaultVariants: {
    variant: "onBrand",
  },
});

export type BadgeProps = ComponentProps<"span"> & VariantProps<typeof badgeVariants>;

export const Badge = ({ className, variant, ...props }: BadgeProps) => {
  return <span className={badgeVariants({ variant, className })} data-slot="badge" {...props} />;
};
