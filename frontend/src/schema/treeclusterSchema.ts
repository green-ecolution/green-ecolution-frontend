import { EntitiesTreeSoilCondition } from "@green-ecolution/backend-client";
import { z } from "zod";

export const TreeclusterSchema = () =>
  z.object({
    name: z.string().min(1, "Name ist erforderlich."),
    address: z.string().min(1, "Adresse ist erforderlich."),
    description: z.string().min(1, "Beschreibung ist erforderlich."),
    soilCondition: z
      .nativeEnum(EntitiesTreeSoilCondition)
      .refine(
        (value) => Object.values(EntitiesTreeSoilCondition).includes(value),
        {
          message: "Keine korrekte Bodenbeschaffenheit.",
        },
      ),
    treeIds: z.array(z.number()),
  });

export type TreeclusterForm = z.infer<ReturnType<typeof TreeclusterSchema>>;
