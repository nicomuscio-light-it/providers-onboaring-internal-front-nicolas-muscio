import { type ChangeEvent, forwardRef, useState } from "react";

import { Icons } from "@/components/ui/icons";
import { Input, type InputProps } from "./input";

export type PasswordInputProps = Omit<InputProps, "type" | "trailing">;

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ onChange, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setHasValue(event.target.value.length > 0);
      onChange?.(event);
    };

    return (
      <Input
        onChange={handleChange}
        ref={ref}
        trailing={
          hasValue ? (
            <button
              aria-label={visible ? "Hide password" : "Show password"}
              className="flex cursor-pointer items-center text-icon-default-secondary transition-colors hover:text-icon-default-default"
              onClick={() => {
                return setVisible((previous) => {
                  return !previous;
                });
              }}
              type="button"
            >
              {visible ? <Icons.EyeOff /> : <Icons.Eye />}
            </button>
          ) : null
        }
        type={visible ? "text" : "password"}
        {...props}
      />
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
