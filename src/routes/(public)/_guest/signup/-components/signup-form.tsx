import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { isAxiosError } from "axios";
import { toast } from "sonner";

import { Button, FormField, Icons, Input, PasswordInput } from "@/components/ui";
import { type SignupFormValues, signupSchema, useSignup } from "@/services";

type SignupFormProps = {
  onSuccess: () => void;
};

// Maps the backend's 422 field keys (under error.fields, snake_case) to the form's
// field names. They stay snake_case because publicApi only camel-cases successful
// responses, not error responses.
const SERVER_FIELD_MAP: Record<string, keyof SignupFormValues> = {
  name: "name",
  email: "email",
  password: "password",
  password_confirmation: "confirmPassword",
};

export const SignupForm = ({ onSuccess }: SignupFormProps) => {
  const {
    formState: { errors, isValid, submitCount },
    handleSubmit,
    register,
    setError,
  } = useForm<SignupFormValues>({
    mode: "onSubmit",
    resolver: zodResolver(signupSchema),
  });

  const { isPending, mutate } = useSignup();

  const onSubmit = handleSubmit((values) => {
    mutate(values, {
      onError: (error) => {
        if (isAxiosError(error) && error.response?.status === 422) {
          const fields = error.response.data?.error?.fields as Record<string, string[]> | undefined;
          let mapped = false;

          if (fields) {
            for (const [serverField, formField] of Object.entries(SERVER_FIELD_MAP)) {
              const message = fields[serverField]?.[0];

              if (message) {
                setError(formField, { message });
                mapped = true;
              }
            }
          }

          if (mapped) {
            return;
          }
        }

        toast.error("Something went wrong. Please try again.");
      },
      onSuccess: () => {
        return onSuccess();
      },
    });
  });

  const isSubmitDisabled = isPending || (submitCount > 0 && !isValid);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[var(--gray-50)] to-[var(--gray-200)] px-4 py-10">
      <div className="w-full max-w-md rounded-xl border border-border-default-default bg-background-default-default p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-medium text-text-default-default">Create account</h1>
        <p className="mt-1 text-[var(--gray-700)]">
          Enter your information to create a new account
        </p>

        <form className="mt-6 flex flex-col gap-4" onSubmit={onSubmit} noValidate>
          <FormField error={errors.name?.message} htmlFor="name" label="Full name">
            <Input
              autoComplete="name"
              error={Boolean(errors.name)}
              id="name"
              placeholder="Full name"
              {...register("name")}
            />
          </FormField>

          <FormField error={errors.email?.message} htmlFor="email" label="Email">
            <Input
              autoComplete="email"
              error={Boolean(errors.email)}
              id="email"
              placeholder="Email"
              type="email"
              {...register("email")}
            />
          </FormField>

          <FormField error={errors.password?.message} htmlFor="password" label="Password">
            <PasswordInput
              autoComplete="new-password"
              error={Boolean(errors.password)}
              id="password"
              placeholder="Password"
              {...register("password")}
            />
          </FormField>

          <FormField
            error={errors.confirmPassword?.message}
            htmlFor="confirmPassword"
            label="Confirm password"
          >
            <PasswordInput
              autoComplete="new-password"
              error={Boolean(errors.confirmPassword)}
              id="confirmPassword"
              placeholder="Confirm password"
              {...register("confirmPassword")}
            />
          </FormField>

          <Button className="mt-2 w-full" disabled={isSubmitDisabled} size="lg" type="submit">
            {isPending ? <Icons.Loader className="animate-spin" /> : null}
            Create account
          </Button>
        </form>

        <Link
          className="mt-4 block text-center text-sm font-medium text-text-default-default underline"
          to="/login"
        >
          Already have an account? Log in
        </Link>
      </div>
    </div>
  );
};
