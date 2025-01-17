import { DrivingLicense } from '@green-ecolution/backend-client'

export const DrivingLicenseOptions = [
  {
    value: DrivingLicense.DrivingLicenseUnknown,
    label: 'Keine Angabe',
  },
  {
    value: DrivingLicense.DrivingLicenseB,
    label: 'B',
  },
  {
    value: DrivingLicense.DrivingLicenseBE,
    label: 'BE',
  },
  {
    value: DrivingLicense.DrivingLicenseC,
    label: 'C',
  },
  {
    value: DrivingLicense.DrivingLicenseCE,
    label: 'CE',
  },
]

export const getDrivingLicenseDetails = (drivingLicense: DrivingLicense) =>
  DrivingLicenseOptions.find((option) => option.value === drivingLicense) ||
  DrivingLicenseOptions[0]
