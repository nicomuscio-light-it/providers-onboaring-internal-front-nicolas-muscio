import axios from "axios";
import { deepCamelKeys } from "string-ts";

import { env } from "./env";

const baseApiConfiguration = {
  baseURL: env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
};

const privateApi = axios.create(baseApiConfiguration);

const publicApi = axios.create(baseApiConfiguration);

publicApi.interceptors.response.use((response) => {
  response.data = deepCamelKeys(response.data);

  return response;
});

export { privateApi, publicApi };
