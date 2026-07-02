import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { isAxiosError } from "axios";
import { toast } from "sonner";

import { Button, FormField, Icons, Input, PasswordInput } from "@/components/ui";
import { type LoginFormValues, loginSchema, useLogin } from "@/services";
import { useAuthStore } from "@/stores";

export const LoginForm = () => {
  const {
    formState: { errors, isDirty },
    handleSubmit,
    register,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const setToken = useAuthStore((state) => {
    return state.setToken;
  });
  const { isPending: isPendingLogin, mutate: login } = useLogin();

  const onSubmit = handleSubmit((values) => {
    login(values, {
      onError: (error) => {
        if (isAxiosError(error) && error.response?.status === 401) {
          toast.error("Email or password is not valid.");

          return;
        }

        toast.error("Something went wrong. Please try again.");
      },
      onSuccess: ({ accessToken }) => {
        setToken(accessToken);

        return navigate({ to: "/" });
      },
    });
  });

  const isSubmitDisabled = isPendingLogin || !isDirty;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-200 px-4 py-10">
      <div className="flex w-full max-w-md flex-col gap-6 rounded-xl border border-border-default-default bg-background-default-default p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-medium text-text-default-default">Welcome back</h1>
          <p className="text-gray-700">Enter your email and password to access your account</p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={onSubmit} noValidate>
          <div className="flex flex-col gap-4">
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
                autoComplete="current-password"
                error={Boolean(errors.password)}
                id="password"
                placeholder="Password"
                {...register("password")}
              />
            </FormField>
          </div>

          <Button className="w-full" disabled={isSubmitDisabled} size="lg" type="submit">
            {isPendingLogin ? <Icons.Loader className="animate-spin" /> : null}
            Log in
          </Button>
        </form>

        <Link
          className="block text-center text-sm font-medium text-text-default-default underline"
          to="/signup"
        >
          Don&apos;t have an account? Sign up
        </Link>
      </div>
    </div>
  );
};
