import { createFileRoute } from "@tanstack/react-router";

import { useCurrentUser } from "@/services";

const HomePage = () => {
  const { data: user } = useCurrentUser();

  return (
    <div className="flex flex-col gap-4">
      <h3>Home</h3>

      {user ? <p>Welcome, {user.name}</p> : null}
    </div>
  );
};

export const Route = createFileRoute("/_private/")({ component: HomePage });
