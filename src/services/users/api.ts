import { privateApi } from "@/config/api";
import { USERS_ENDPOINT } from "./constants";
import type { User } from "./types";

export const getUser = async (id: number) => {
  const response = await privateApi.get<{ data: User }>(`${USERS_ENDPOINT}/${id}`);

  return response.data.data;
};
