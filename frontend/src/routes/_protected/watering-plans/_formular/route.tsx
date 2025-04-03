import useFormStore from "@/store/form/useFormStore";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { z } from "zod";

const wateringPlanFormularSchema = z.object({
  resetStore: z.boolean().default(true),
});

export const Route = createFileRoute("/_protected/watering-plans/_formular")({
  component: () => <Outlet />,
  validateSearch: wateringPlanFormularSchema,
  loaderDeps: ({ search: { resetStore } }) => ({
    resetStore,
  }),
  loader: ({ deps: { resetStore } }) => {
    if (resetStore) {
      useFormStore.getState().reset();
    }
  },
});
