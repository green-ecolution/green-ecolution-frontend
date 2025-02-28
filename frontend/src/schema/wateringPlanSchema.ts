import { userRoleQuery, vehicleQuery } from '@/api/queries'
import {
  DrivingLicense,
  WateringPlanStatus,
} from '@green-ecolution/backend-client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { z } from 'zod'

export const WateringPlanSchema = (
  actionType: 'create' | 'update' | 'statusUpdate'
) => {
  const { data: transporters } = useSuspenseQuery(
    vehicleQuery({ type: 'transporter' })
  )
  const { data: trailers } = useSuspenseQuery(vehicleQuery({ type: 'trailer' }))
  const { data: users } = useSuspenseQuery(userRoleQuery('tbz'))

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
            if (actionType === 'create') {
              const todayAtMidnight = new Date()
              todayAtMidnight.setHours(0, 0, 0, 0)
              return data > todayAtMidnight
            }
            return true
          },
          { message: 'Datum muss in der Zukunft liegen' }
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
    userIds: z.array(z.string()).min(1, 'Mitarbeitenden sind erforderlich.'),
    transporterId: z.preprocess(
      (value) => parseInt(value as string, 10),
      z.number().refine(
        (value) => {
          if (actionType === 'statusUpdate') {
            // skip validation on status update because archived vehicles are allowed
            return true
          }
          return transporters.data.some(
            (transporter) => transporter.id === value
          )
        },
        { message: 'Fahrzeug ist erforderlich.' }
      )
    ),
    trailerId: z.preprocess(
      (value) => parseInt(value as string, 10),
      z
        .number()
        .optional()
        .refine(
          (value) => {
            if (actionType === 'statusUpdate') {
              // skip validation on status update because archived vehicles are allowed
              return true
            }
            return (
              value === -1 ||
              trailers.data.some((trailer) => trailer.id === value)
            )
          },
          { message: 'Ungültiger Anhänger.' }
        )
    ),
    evaluation: z
      .array(
        z.object({
          consumedWater: z
            .number()
            .min(0, 'Verbrauchtes Wasser muss positiv sein.'),
          treeClusterId: z.number().min(1, 'Ungültige Baumcluster-ID.'),
          wateringPlanId: z.number().min(1, 'Ungültige Bewässerungsplan-ID.'),
        })
      )
      .default([]),
  })
  .superRefine((data, ctx) => {
    const { userIds, transporterId, trailerId } = data
    const transporter = transporters.data.find((t) => t.id === transporterId)
    if (!transporter) return

    const trailer = trailers.data.find((t) => t.id === trailerId)
    const requiredLicenses = new Set<DrivingLicense>(
      [transporter.drivingLicense, trailer?.drivingLicense].filter(
        (license): license is DrivingLicense => license !== undefined
      )
    )

    const hasValidDriver = userIds.some((userId) => {
      const user = users.data.find((u) => u.id === userId)
      return (
        user &&
        [...requiredLicenses].every((license) =>
          user.drivingLicenses.includes(license)
        )
      )
    })

    if (!hasValidDriver) {
      ctx.addIssue({
        code: 'custom',
        path: ['userIds'],
        message:
          'Mindestens ein Mitarbeitender muss die erforderliche Führerscheinklasse besitzen.',
      })
    }
  })
}

export type WateringPlanForm = z.infer<ReturnType<typeof WateringPlanSchema>>
