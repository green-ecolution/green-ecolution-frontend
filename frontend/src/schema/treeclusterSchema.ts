import { SoilCondition } from '@green-ecolution/backend-client'
import { z } from 'zod'

export const TreeclusterSchema = z.object({
  name: z.string().min(1, 'Name ist erforderlich.').default(''),
  address: z.string().min(1, 'Adresse ist erforderlich.').default(''),
  description: z.string().optional().default(''),
  soilCondition: z
    .nativeEnum(SoilCondition)
    .refine((value) => Object.values(SoilCondition).includes(value), {
      message: 'Keine korrekte Bodenbeschaffenheit.',
    })
    .default(SoilCondition.TreeSoilConditionUnknown),
  treeIds: z.array(z.number()).default([]),
})

export type TreeclusterForm = z.infer<typeof TreeclusterSchema>
