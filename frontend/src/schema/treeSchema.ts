import { sensorQuery, treeClusterQuery } from '@/api/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { z } from 'zod'

export const TreeSchema = (lat: number, lng: number) => {
  const { data: treeClusters } = useSuspenseQuery(treeClusterQuery())
  const { data: sensors } = useSuspenseQuery(sensorQuery())

  return z.object({
    latitude: z.number().default(lat),
    longitude: z.number().default(lng),
    treeNumber: z.string().min(1, 'Baumnummer ist erforderlich.'),
    species: z.string().min(1, 'Art ist erforderlich.'),
    readonly: z.boolean().default(false),
    plantingYear: z.preprocess(
      (value) => parseInt(value as string, 10),
      z
        .number()
        .int()
        .min(2020, 'Pflanzjahr vor 2020 ist nicht möglich.')
        .max(
          new Date().getFullYear(),
          'Pflanzjahr kann nicht in der Zukunft liegen.'
        )
        .default(() => new Date().getFullYear())
    ),
    treeClusterId: z
      .preprocess(
        (value) => parseInt(value as string, 10),
        z
          .number()
          .refine((value) =>
            treeClusters.data.some((cluster) => cluster.id === value)
          )
      )
      .or(z.literal('-1').or(z.literal(-1))), // -1 no cluster selected
    sensorId: z
      .preprocess(
        (value) => value,
        z
          .string()
          .refine((value) => sensors.data.some((sensor) => sensor.id === value))
          .optional()
      )
      .or(z.literal('-1')), // -1 no sensor selected
    description: z.string().optional(),
  })
}

export type TreeForm = z.infer<ReturnType<typeof TreeSchema>>
