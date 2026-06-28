import { createFileRoute } from "@tanstack/react-router";

import { LoginForm } from "./-components/login-form";

const LoginPage = () => {
  return <LoginForm />;
};

export const Route = createFileRoute("/(public)/_guest/login/")({ component: LoginPage });
