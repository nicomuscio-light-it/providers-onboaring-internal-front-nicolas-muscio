import { useMutation } from "@tanstack/react-query";

import { signup } from "./api";
import { mutations } from "./factories";

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
    mutationKey: mutations.signup,
  });
};
