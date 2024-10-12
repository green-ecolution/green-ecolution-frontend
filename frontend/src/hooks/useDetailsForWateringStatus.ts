import { EntitiesWateringStatus } from '@green-ecolution/backend-client'

const WateringStatusProperties = {
  [EntitiesWateringStatus.WateringStatusUnknown]: {
    color: 'dark-400',
    label: 'Unbekannt',
    description: 'Der Bewässerungsstatus ist unbekannt.',
    colorHex: '#A2A2A2',
  },
  [EntitiesWateringStatus.WateringStatusBad]: {
    color: 'red',
    label: 'Sehr trocken',
    description: 'Die Bäume benötigen dringend Wasser.',
    colorHex: '#E44E4D',
  },
  [EntitiesWateringStatus.WateringStatusModerate]: {
    color: 'yellow',
    label: 'Leicht trocken',
    description: 'Die Bäume sind leicht trocken und benötigen etwas Wasser.',
    colorHex: '#FFC434',
  },
  [EntitiesWateringStatus.WateringStatusGood]: {
    color: 'green-light',
    label: 'In Ordnung',
    description:
      'Die Bewässerung ist ausreichend, keine Maßnahmen erforderlich.',
    colorHex: '#ACB63B',
  },
} as const

type WateringStatusDetails =
  (typeof WateringStatusProperties)[EntitiesWateringStatus]

export const getWateringStatusDetails = (
  status: EntitiesWateringStatus
): WateringStatusDetails => {
  return WateringStatusProperties[status]
}
