import { createFileRoute } from "@tanstack/react-router";

import { providersSearchSchema } from "@/services";
import { ProvidersPage } from "./-components";

export const Route = createFileRoute("/_private/providers/")({
  validateSearch: (search) => {
    return providersSearchSchema.parse(search);
  },
  component: ProvidersPage,
});
