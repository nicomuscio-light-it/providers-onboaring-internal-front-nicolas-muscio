import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { isTokenExpired } from "@/services";
import { useAuthStore } from "@/stores";
import { Header } from "./-components";

const PrivateLayout = () => {
  return (
    <div>
      <Header />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-6 md:px-6">
        <Outlet />
      </main>
    </div>
  );
};

export const Route = createFileRoute("/_private")({
  beforeLoad: () => {
    const { clearToken, token } = useAuthStore.getState();

    if (!token || isTokenExpired(token)) {
      clearToken();

      throw redirect({ to: "/login" });
    }
  },
  component: PrivateLayout,
});
