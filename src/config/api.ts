import axios from "axios";
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

privateApi.interceptors.response.use((response) => {
  response.data = deepCamelKeys(response.data);

  return response;
});

const publicApi = axios.create(baseApiConfiguration);

publicApi.interceptors.response.use((response) => {
  response.data = deepCamelKeys(response.data);

  return response;
});

export { privateApi, publicApi };
