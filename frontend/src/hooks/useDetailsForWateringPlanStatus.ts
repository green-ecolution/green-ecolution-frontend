import { WateringPlan, WateringPlanStatus } from '@green-ecolution/backend-client'

export const WateringPlanStatusOptions = [
  {
    value: WateringPlanStatus.WateringPlanStatusUnknown,
    label: 'Unbekannt',
    color: 'dark-400',
    description: 'Der Status der Einsatzplanung ist unbekannt.',
  },
  {
    value: WateringPlanStatus.WateringPlanStatusActive,
    label: 'Aktiv',
    color: 'green-light',
    description: 'Der Einsatzplan ist aktiv und wird aktuell ausgeführt.',
  },
  {
    value: WateringPlanStatus.WateringPlanStatusCanceled,
    label: 'Abgebrochen',
    color: 'red',
    description:
      'Der Einsatzplan wurde abgebrochen und ist nicht fertig gestellt.',
  },
  {
    value: WateringPlanStatus.WateringPlanStatusFinished,
    label: 'Beendet',
    color: 'green-dark',
    description: 'Der Einsatzplan wurde erfolgreich beendet.',
  },
  {
    value: WateringPlanStatus.WateringPlanStatusNotCompeted,
    label: 'Nicht angetreten',
    color: 'dark-400',
    description: 'Der Einsatzplan wurde nicht angetreten.',
  },
  {
    value: WateringPlanStatus.WateringPlanStatusPlanned,
    label: 'Geplant',
    color: 'dark-400',
    description: 'Der Einsatzplan ist geplant und kann gestartet werden.',
  },
]

export const getWateringPlanStatusDetails = (status: WateringPlanStatus) => {
  return (
    WateringPlanStatusOptions.find((option) => option.value === status) ||
    WateringPlanStatusOptions[0]
  )
}

export const showWateringPlanStatusButton = (wateringPlan: WateringPlan): boolean => {
  return (
    wateringPlan.status !== WateringPlanStatus.WateringPlanStatusNotCompeted &&
    wateringPlan.status !== WateringPlanStatus.WateringPlanStatusFinished &&
    wateringPlan.status !== WateringPlanStatus.WateringPlanStatusCanceled
  )
}