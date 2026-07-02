import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { useAuthStore } from "@/stores";
import { Header } from "./-components";

const PrivateLayout = () => {
  return (
    <div>
      <Header />

      <main className="flex flex-col gap-4 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export const Route = createFileRoute("/_private")({
  beforeLoad: () => {
    const { token } = useAuthStore.getState();

    if (!token) {
      throw redirect({ to: "/login" });
    }
  },
  component: PrivateLayout,
});
