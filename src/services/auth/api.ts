import { publicApi } from "@/config/api";
import { SIGNUP_ENDPOINT } from "./constants";
import type { SignupPayload } from "./types";

export const signup = (payload: SignupPayload) => {
  return publicApi.post(SIGNUP_ENDPOINT, payload);
};
