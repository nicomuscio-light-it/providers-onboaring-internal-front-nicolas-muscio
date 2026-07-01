import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { isAxiosError } from "axios";
import { toast } from "sonner";

import { Button, FormField, Icons, Input, PasswordInput } from "@/components/ui";
import { type SignupFormValues, type SignupPayload, signupSchema, useSignup } from "@/services";

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
    formState: { errors, isDirty },
    handleSubmit,
    register,
    setError,
  } = useForm<SignupFormValues>({
    defaultValues: {
      confirmPassword: "",
      email: "",
      name: "",
      password: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(signupSchema),
  });

  const { isPending: isPendingSignup, mutate: signup } = useSignup();

  const onSubmit = handleSubmit((values) => {
    const payload: SignupPayload = {
      name: values.name,
      email: values.email,
      password: values.password,
      password_confirmation: values.confirmPassword,
    };

    signup(payload, {
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

  const isSubmitDisabled = isPendingSignup || !isDirty;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-200 px-4 py-10">
      <div className="flex w-full max-w-md flex-col gap-6 rounded-xl border border-border-default-default bg-background-default-default p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-medium text-text-default-default">Create account</h1>
          <p className="text-gray-700">Enter your information to create a new account</p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={onSubmit} noValidate>
          <div className="flex flex-col gap-4">
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
          </div>

          <Button className="w-full" disabled={isSubmitDisabled} size="lg" type="submit">
            {isPendingSignup ? <Icons.Loader className="animate-spin" /> : null}
            Create account
          </Button>
        </form>

        <Link
          className="block text-center text-sm font-medium text-text-default-default underline"
          to="/login"
        >
          Already have an account? Log in
        </Link>
      </div>
    </div>
  );
};
