import { createFileRoute } from "@tanstack/react-router";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-4">
      <h3>Home</h3>
    </div>
  );
};

export const Route = createFileRoute("/_private/")({ component: HomePage });
