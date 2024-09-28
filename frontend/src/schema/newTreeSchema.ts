import { clusterApi, sensorApi, treeApi } from "@/api/backendApi";
import { useAuthHeader } from "@/hooks/useAuthHeader";
import { useSuspenseQuery } from "@tanstack/react-query";
import { z } from "zod";

export const NewTreeSchema = (lat: number, lng: number) => {
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
    lat: z.number().default(lat),
    lng: z.number().default(lng),
    heightAboveSeaLevel: z.number().int().optional(),
    number: z.string().min(1, "Baumnummer ist erforderlich."),
    species: z.string().min(1, "Art ist erforderlich."),
    plantingYear: z.preprocess(
      (value) => parseInt(value as string, 10),
      z
        .number()
        .int()
        .min(2020, "Pflanzjahr vor 2020 ist nicht möglich.")
        .max(
          new Date().getFullYear(),
          "Pflanzjahr kann nicht in der Zukunft liegen.",
        )
        .default(() => new Date().getFullYear()),
    ),
    treeClusterId: z.preprocess(
      (value) => parseInt(value as string, 10),
      z
        .number()
        .refine((value) =>
          treeClusters?.data.some((cluster) => cluster.id === value || value === -1),
        )
        .optional(),
    ),
    sensorId: z.preprocess(
      (value) => parseInt(value as string, 10),
      z
        .number()
        .refine((value) => sensors?.data.some((sensor) => sensor.id === value || value === -1))
        .optional(),
    ),
    description: z.string().optional(),
  });
};

export type NewTreeForm = z.infer<ReturnType<typeof NewTreeSchema>>;
