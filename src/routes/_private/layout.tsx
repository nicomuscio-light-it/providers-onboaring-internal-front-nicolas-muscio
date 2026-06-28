import { createFileRoute, Outlet } from "@tanstack/react-router";

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
  // TODO: Add authentication middleware logic to restrict access to private routes.
  component: PrivateLayout,
});
