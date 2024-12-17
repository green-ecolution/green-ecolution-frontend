import { WateringPlanStatus } from '@green-ecolution/backend-client'

const WateringPlanStatusProperties = {
  [WateringPlanStatus.WateringPlanStatusUnknown]: {
    color: 'dark-400',
    label: 'Unbekannt',
    description: 'Der Status der Einsatzplanung ist unbekannt.',
  },
  [WateringPlanStatus.WateringPlanStatusActive]: {
    color: 'green-light',
    label: 'Aktiv',
    description: 'Der Einsatzplan ist aktiv und wird aktuell ausgeführt.',
  },
  [WateringPlanStatus.WateringPlanStatusCanceled]: {
    color: 'red',
    label: 'Abgebrochen',
    description: 'Der Einsatzplan wurde abgebrochen und ist nicht fertig gestellt.',
  },
  [WateringPlanStatus.WateringPlanStatusFinished]: {
    color: 'green-light',
    label: 'Beende',
    description:
      'Der Einsatzplan wurde erfolgreich beendet.',
  },
  [WateringPlanStatus.WateringPlanStatusNotCompeted]: {
    color: 'green-light',
    label: 'Nicht angetreten',
    description:
      'Der Einsatzplan wurde nicht angetreten.',
  },
  [WateringPlanStatus.WateringPlanStatusPlanned]: {
    color: 'green-light',
    label: 'Geplant',
    description:
      'Der Einsatzplan ist geplant und kann gestartet werden.',
  },
} as const

type WateringPlanStatusDetails =
  (typeof WateringPlanStatusProperties)[WateringPlanStatus]

export const getWateringPlanStatusDetails = (
  status: WateringPlanStatus
): WateringPlanStatusDetails => {
  return WateringPlanStatusProperties[status]
}
