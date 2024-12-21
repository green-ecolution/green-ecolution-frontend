import { z } from 'zod'

export const WateringPlanSchema = z.object({
  date: z.date({
    required_error: "Datum ist erforderlich.",
    invalid_type_error: "Format inkorrekt.",
  }).refine((data) => data > new Date(), { message: "Datum muss in der Zukunft liegen" }),
  description: z.string().optional().default(''),
  treeClusterIds: z.array(z.number()).default([]),
})

export type WateringPlanForm = z.infer<typeof WateringPlanSchema>
