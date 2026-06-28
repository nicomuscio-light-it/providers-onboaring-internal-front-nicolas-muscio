import { type ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-all duration-300 ease-in-out focus-visible:ring-4 focus-visible:ring-background-brand-default/25 focus-visible:outline-none disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  variants: {
    variant: {
      primary:
        "bg-background-brand-default text-text-brand-on-brand hover:bg-background-brand-hover active:bg-background-brand-default disabled:bg-background-disabled-default disabled:text-text-disabled-on-disabled",
      secondary:
        "bg-background-brand-secondary text-text-brand-on-brand-secondary hover:bg-background-brand-secondary-hover active:bg-background-brand-secondary disabled:bg-background-disabled-default disabled:text-text-disabled-on-disabled",
    },
    size: {
      sm: "px-1.5 py-1 text-xs md:px-2 md:py-1.5 md:text-sm",
      default: "px-1.5 py-1 text-sm md:px-2 md:py-1.5 md:text-base",
      lg: "px-3 py-2 text-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

export type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

const Button = ({ className, size, variant, ...props }: ButtonProps) => {
  return (
    <button className={buttonVariants({ variant, size, className })} type="button" {...props} />
  );
};

export { Button, buttonVariants };
