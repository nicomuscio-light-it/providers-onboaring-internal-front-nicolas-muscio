import { publicApi } from "@/config/api";
import { LOGIN_ENDPOINT, SIGNUP_ENDPOINT } from "./constants";
import { loginResponseSchema } from "./schemas";
import type { LoginPayload, SignupPayload } from "./types";

export const login = async (payload: LoginPayload) => {
  const response = await publicApi.post(LOGIN_ENDPOINT, payload);

  return loginResponseSchema.parse(response.data).data;
};

export const signup = (payload: SignupPayload) => {
  return publicApi.post(SIGNUP_ENDPOINT, payload);
};
