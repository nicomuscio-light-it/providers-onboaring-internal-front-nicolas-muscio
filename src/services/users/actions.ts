import { useQuery } from "@tanstack/react-query";

import { getUserIdFromToken } from "@/services/auth";
import { useAuthStore } from "@/stores";
import { getUser } from "./api";
import { queries } from "./factories";

export const useUser = (id: number | null) => {
  return useQuery({
    enabled: id !== null,
    queryFn: () => {
      return getUser(id as number);
    },
    queryKey: queries.detail(id ?? 0).queryKey,
  });
};

export const useCurrentUser = () => {
  const token = useAuthStore((state) => {
    return state.token;
  });
  const userId = token ? getUserIdFromToken(token) : null;

  return useUser(userId);
};
