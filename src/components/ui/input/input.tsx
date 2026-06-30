import { type ComponentProps, forwardRef, type ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const inputVariants = tv({
  base: "w-full rounded-md border bg-background-default-default px-3 py-2 text-base text-text-default-default transition-colors duration-200 outline-none placeholder:text-text-default-tertiary focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-60",
  variants: {
    error: {
      true: "border-border-danger-tertiary text-text-danger-tertiary focus-visible:border-border-danger-tertiary focus-visible:ring-background-danger-default/15",
      false:
        "border-border-default-default focus-visible:border-border-brand-default focus-visible:ring-background-brand-default/15",
    },
    hasTrailing: {
      true: "pr-11",
    },
  },
  defaultVariants: {
    error: false,
  },
});

export type InputProps = ComponentProps<"input"> &
  VariantProps<typeof inputVariants> & {
    /** Element rendered inside the input, anchored to the right (e.g. a password toggle). */
    trailing?: ReactNode;
  };

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, trailing, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          className={inputVariants({ error, hasTrailing: !!trailing, className })}
          ref={ref}
          {...props}
        />

        {trailing ? (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">{trailing}</div>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input, inputVariants };
