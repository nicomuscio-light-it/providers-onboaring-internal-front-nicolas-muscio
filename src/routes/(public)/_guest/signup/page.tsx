import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { SignupForm, SignupSuccess } from "./-components";

const SignupPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  if (isSuccess) {
    return <SignupSuccess />;
  }

  return (
    <SignupForm
      onSuccess={() => {
        return setIsSuccess(true);
      }}
    />
  );
};

export const Route = createFileRoute("/(public)/_guest/signup/")({ component: SignupPage });
