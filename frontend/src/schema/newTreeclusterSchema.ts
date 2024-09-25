import { z } from 'zod';
import { Region } from '@/types/Region';
import { EntitiesTreeSoilCondition } from '@/api/backendApi';

export const NewTreeClusterSchema = z.object({
  name: z.string().min(1, 'Name ist erforderlich.'),
  address: z.string().min(1, 'Adresse ist erforderlich.'),
  region: z.nativeEnum(Region).refine((value) => Object.values(Region).includes(value), {
    message: 'Keine korrekte Region.',
  }),
  description: z.string().min(1, 'Beschreibung ist erforderlich.'),
  soilCondition: z.nativeEnum(EntitiesTreeSoilCondition).refine((value) => Object.values(EntitiesTreeSoilCondition).includes(value), {
    message: 'Keine korrekte Bodenbeschaffenheit.',
  }),
});

export type NewTreeClusterForm = z.infer<typeof NewTreeClusterSchema>;