import { publicApi } from "@/config/api";
import { SIGNUP_ENDPOINT } from "./constants";
import type { SignupFormValues, SignupPayload } from "./types";

export const signup = (values: SignupFormValues) => {
  const payload: SignupPayload = {
    name: values.name,
    email: values.email,
    password: values.password,
    password_confirmation: values.confirmPassword,
  };

  return publicApi.post(SIGNUP_ENDPOINT, payload);
};
