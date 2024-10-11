import { clusterApi, sensorApi, Tree, treeApi } from "@/api/backendApi";
import queryClient from "@/api/queryClient";
import useFormStore from "@/store/form/useFormStore";
import useStore from "@/store/store";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { z } from "zod";

const treeFormularSchema = z.object({
  resetStore: z.boolean().default(true),
});

export const treeClusterQuery = (authorization: string) =>
  queryOptions({
    queryKey: ["cluster"],
    queryFn: () => clusterApi.getAllTreeClusters({ authorization }),
  });

export const sensorQuery = (authorization: string) =>
  queryOptions({
    queryKey: ["sensors"],
    queryFn: () => sensorApi.getAllSensors({ authorization }),
  });

export const treeQuery = (treeId: string, authorization: string) =>
  queryOptions<Tree>({
    queryKey: ["tree", treeId],
    queryFn: () => treeApi.getTrees({ treeId, authorization }),
  });

export const Route = createFileRoute("/_protected/tree/_formular")({
  component: () => <Outlet />,
  validateSearch: treeFormularSchema,
  loaderDeps: ({ search: { resetStore } }) => ({
    resetStore,
  }),
  loader: ({ deps: { resetStore } }) => {
    if (resetStore) {
      useFormStore.getState().reset();
    }

    if (!useStore.getState().auth.isAuthenticated) return;

    const token = useStore.getState().auth.token?.accessToken;
    return {
      treeClusters: queryClient.ensureQueryData(
        treeClusterQuery(`Bearer ${token}`),
      ),
      sensors: queryClient.ensureQueryData(
        sensorQuery(`Bearer ${token}`),
      ),
    };
  },
});
