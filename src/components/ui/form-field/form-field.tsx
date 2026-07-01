import { type PropsWithChildren } from "react";

export type FormFieldProps = PropsWithChildren<{
  label: string;
  htmlFor: string;
  error?: string;
}>;

const FormField = ({ children, error, htmlFor, label }: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm text-text-default-default" htmlFor={htmlFor}>
        {label}
      </label>

      {children}

      {error ? <p className="text-sm text-text-danger-default">{error}</p> : null}
    </div>
  );
};

export { FormField };
