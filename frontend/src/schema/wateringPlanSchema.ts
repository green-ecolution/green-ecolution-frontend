import { vehicleQuery } from '@/api/queries'
import { WateringPlanStatus } from '@green-ecolution/backend-client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { z } from 'zod'

export const WateringPlanSchema = (isCreate: boolean) => {
  const { data: transporters } = useSuspenseQuery(
    vehicleQuery({
      type: 'transporter',
    })
  )
  const { data: trailers } = useSuspenseQuery(
    vehicleQuery({
      type: 'trailer',
    })
  )

  return z.object({
    date: z.preprocess(
      (value) => {
        if (typeof value === 'string') {
          const parsedDate = new Date(value)
          if (isNaN(parsedDate.getTime())) return undefined
          return parsedDate
        }
        return value
      },
      z
        .date({
          required_error: 'Datum ist erforderlich.',
          invalid_type_error: 'Format inkorrekt.',
        })
        .refine(
          (data) => {
            if (isCreate) {
              const todayAtMidnight = new Date()
              todayAtMidnight.setHours(0, 0, 0, 0)
              return data > todayAtMidnight
            }
            return true
          },
          {
            message: 'Datum muss in der Zukunft liegen',
          }
        )
    ),
    status: z
      .nativeEnum(WateringPlanStatus)
      .refine((value) => Object.values(WateringPlanStatus).includes(value), {
        message: 'Kein korrekter Status.',
      })
      .default(WateringPlanStatus.WateringPlanStatusUnknown),
    description: z.string().optional().default(''),
    cancellationNote: z.string().optional().default(''),
    treeClusterIds: z
      .array(z.number())
      .min(1, 'Bewässerungsgruppen sind erforderlich.')
      .default([]),
    transporterId: z.preprocess(
      (value) => parseInt(value as string, 10),
      z
        .number()
        .refine(
          (value) =>
            transporters.data.some((transporter) => transporter.id === value),
          { message: 'Fahrzeug ist erforderlich.' }
        )
    ),
    trailerId: z
      .preprocess(
        (value) => parseInt(value as string, 10),
        z
          .number()
          .optional()
          .refine(
            (value) =>
              value === -1 ||
              trailers.data.some((trailer) => trailer.id === value),
            { message: 'Ungültiger Anhänger.' }
          )
      )
      .optional(),
  })
}

export type WateringPlanForm = z.infer<ReturnType<typeof WateringPlanSchema>>
