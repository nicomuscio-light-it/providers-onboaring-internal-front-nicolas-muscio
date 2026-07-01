import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => {
      return {
        token: null,
        setToken: (token) => {
          return set({ token });
        },
        clearToken: () => {
          return set({ token: null });
        },
      };
    },
    { name: "auth" },
  ),
);
