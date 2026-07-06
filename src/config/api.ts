import axios, { isAxiosError } from "axios";
import { deepCamelKeys } from "string-ts";

import { useAuthStore } from "@/stores";
import { env } from "./env";

const baseApiConfiguration = {
  baseURL: env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
};

const privateApi = axios.create(baseApiConfiguration);

privateApi.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

privateApi.interceptors.response.use(
  (response) => {
    response.data = deepCamelKeys(response.data);

    return response;
  },
  (error) => {
    if (isAxiosError(error) && error.response?.status === 401) {
      useAuthStore.getState().clearToken();

      if (window.location.pathname !== "/login") {
        window.location.assign("/login");
      }
    }

    return Promise.reject(error);
  },
);

const publicApi = axios.create(baseApiConfiguration);

publicApi.interceptors.response.use((response) => {
  response.data = deepCamelKeys(response.data);

  return response;
});

export { privateApi, publicApi };
