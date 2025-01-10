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
    .default(DrivingLicense.DrivingLicenseCar),
  status: z
    .nativeEnum(VehicleStatus)
    .refine((value) => Object.values(VehicleStatus).includes(value), {
      message: 'Keine korrekter Fahrzeugstatus.',
    })
    .default(VehicleStatus.VehicleStatusUnknown),
  height: z.preprocess((value) => {
    if (typeof value === 'string') {
      return parseFloat(value.replace(',', '.'))
    }
  }, z.number().min(1, 'Höhe ist erforderlich.').default(1)),
  width: z.preprocess((value) => {
    if (typeof value === 'string') {
      return parseFloat(value.replace(',', '.'))
    }
  }, z.number().min(1, 'Breite ist erforderlich.').default(1)),
  length: z.preprocess((value) => {
    if (typeof value === 'string') {
      return parseFloat(value.replace(',', '.'))
    }
  }, z.number().min(1, 'Länge ist erforderlich.').default(1)),
  weight: z.preprocess((value) => {
    if (typeof value === 'string') {
      return parseFloat(value.replace(',', '.'))
    }
  }, z.number().min(1, 'Gewicht ist erforderlich.').default(1)),
  model: z.string().optional().default(''),
  waterCapacity: z.preprocess(
    (value) => parseInt(value as string, 10),
    z.number().int().min(0, 'Wasserkapazität ist erforderlich').default(1)
  ),
  description: z.string().optional().default(''),
})

export type VehicleForm = z.infer<typeof VehicleSchema>
