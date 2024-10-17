import { EntitiesTreeSoilCondition } from '@green-ecolution/backend-client'
import { z } from 'zod'

export const TreeclusterSchema = z.object({
  name: z.string().min(1, 'Name ist erforderlich.').default(''),
  address: z.string().min(1, 'Adresse ist erforderlich.').default(''),
  description: z.string().optional().default(''),
  soilCondition: z
    .nativeEnum(EntitiesTreeSoilCondition)
    .refine(
      (value) => Object.values(EntitiesTreeSoilCondition).includes(value),
      {
        message: 'Keine korrekte Bodenbeschaffenheit.',
      }
    )
    .default(EntitiesTreeSoilCondition.TreeSoilConditionUnknown),
  treeIds: z.array(z.number()).default([]),
})

export type TreeclusterSchema = z.infer<typeof TreeclusterSchema>
