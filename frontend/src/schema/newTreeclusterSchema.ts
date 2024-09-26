import { EntitiesTreeSoilCondition } from '@green-ecolution/backend-client';
import { z } from 'zod';

export const NewTreeClusterSchema = (regions: { id: string; name: string }[]) =>
  z.object({
    name: z.string().min(1, 'Name ist erforderlich.'),
    address: z.string().min(1, 'Adresse ist erforderlich.'),
    region: z.string().refine((value) => regions.some((region) => region.id === value), {
      message: 'Keine korrekte Region.',
    }),
    description: z.string().min(1, 'Beschreibung ist erforderlich.'),
    soilCondition: z.nativeEnum(EntitiesTreeSoilCondition).refine(
      (value) => Object.values(EntitiesTreeSoilCondition).includes(value),
      {
        message: 'Keine korrekte Bodenbeschaffenheit.',
      }
    ),
  });

export type NewTreeClusterForm = z.infer<ReturnType<typeof NewTreeClusterSchema>>;
