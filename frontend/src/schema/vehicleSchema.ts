import {
  VehicleType,
  DrivingLicense,
  VehicleStatus,
} from '@green-ecolution/backend-client'
import { z } from 'zod'

export const VehicleSchema = z.object({
  numberPlate: z.string().min(1, 'Kennzeichen ist erforderlich.').default(''),
  type: z
    .nativeEnum(VehicleType)
    .refine((value) => Object.values(VehicleType).includes(value), {
      message: 'Kein korrekter Fahrzeugtyp.',
    })
    .default(VehicleType.VehicleTypeUnknown),
  drivingLicense: z
    .nativeEnum(DrivingLicense)
    .refine((value) => Object.values(DrivingLicense).includes(value), {
      message: 'Keine korrekte Fahrzeugerlaubnis.',
    })
    .default(DrivingLicense.DrivingLicenseB),
  status: z
    .nativeEnum(VehicleStatus)
    .refine((value) => Object.values(VehicleStatus).includes(value), {
      message: 'Keine korrekter Fahrzeugstatus.',
    })
    .default(VehicleStatus.VehicleStatusUnknown),
  height: z.preprocess((value) => {
    if (typeof value === 'string' && value.trim() !== '') {
      return parseFloat(value.replace(',', '.'))
    }
    return value
  }, z.number().min(1, 'Höhe ist erforderlich.').default(1)),
  width: z.preprocess((value) => {
    if (typeof value === 'string' && value.trim() !== '') {
      return parseFloat(value.replace(',', '.'))
    }
    return value
  }, z.number().min(1, 'Breite ist erforderlich.').default(1)),
  length: z.preprocess((value) => {
    if (typeof value === 'string' && value.trim() !== '') {
      return parseFloat(value.replace(',', '.'))
    }
    return value
  }, z.number().min(1, 'Länge ist erforderlich.').default(1)),
  weight: z.preprocess((value) => {
    if (typeof value === 'string' && value.trim() !== '') {
      return parseFloat(value.replace(',', '.'))
    }
    return value
  }, z.number().min(1, 'Gewicht ist erforderlich.').default(1)),
  model: z.string().optional().default(''),
  waterCapacity: z.preprocess(
    (value) => parseInt(value as string, 10),
    z.number().int().min(120, 'Wasserkapazität ist erforderlich und darf nicht unter 120 liegen.').default(120)
  ),
  description: z.string().optional().default(''),
})

export type VehicleForm = z.infer<typeof VehicleSchema>
