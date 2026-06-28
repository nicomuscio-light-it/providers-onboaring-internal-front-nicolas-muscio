import { createFileRoute, Outlet } from "@tanstack/react-router";

const GuestLayout = () => {
  return <Outlet />;
};

export const Route = createFileRoute("/(public)/_guest")({
  component: GuestLayout,
});
