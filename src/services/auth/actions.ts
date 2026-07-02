import { useMutation } from "@tanstack/react-query";

import { login, signup } from "./api";
import { mutations } from "./factories";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    mutationKey: mutations.login,
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
    mutationKey: mutations.signup,
  });
};
