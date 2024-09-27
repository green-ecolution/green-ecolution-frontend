import { clusterApi, sensorApi, treeApi } from "@/api/backendApi";
import { useAuthHeader } from "@/hooks/useAuthHeader";
import { useSuspenseQuery } from "@tanstack/react-query";
import { z } from "zod";

export const NewTreeSchema = () => {
  const authorization = useAuthHeader();
  const { data: treeClusters } = useSuspenseQuery({
    queryKey: ["treeClusters"],
    queryFn: () => treeApi.getAllTrees({ authorization }), // TODO: Change to treeClusters
  });

  const { data: sensors } = useSuspenseQuery({
    queryKey: ["sensors"],
    queryFn: () => treeApi.getAllTrees({ authorization }), // TODO: Change to sensors
  });

  return z.object({
    heightAboveSeaLevel: z.number().int().optional(),
    number: z.string().min(1, "Baumnummer ist erforderlich."),
    species: z.string().min(1, "Art ist erforderlich."),
    plantingYear: z
      .number()
      .int()
      .min(2020, "Pflanzjahr vor 2020 ist nicht möglich.")
      .max(
        new Date().getFullYear(),
        "Pflanzjahr nach aktuellem Jahr ist nicht möglich.",
      ),
    treeClusterId: z.number().refine((value) =>
      treeClusters?.data.some((cluster) => cluster.id === value),
    ),
    sensorId: z.number().refine((value) =>
      sensors?.data.some((sensor) => sensor.id === value),
    ),
    description: z.string().optional(),
  });
}

export type NewTreeForm = z.infer<
  ReturnType<typeof NewTreeSchema>
>;
