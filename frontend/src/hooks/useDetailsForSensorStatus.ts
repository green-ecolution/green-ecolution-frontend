import { EntitiesSensorStatus } from '@green-ecolution/backend-client'

const SensorStatusProperties = {
  [EntitiesSensorStatus.SensorStatusUnknown]: {
    color: 'dark-400',
    label: 'Unbekannt',
    description: 'Der Status ist unbekannt.',
  },
  [EntitiesSensorStatus.SensorStatusOffline]: {
    color: 'red',
    label: 'Offline',
    description: 'Einige Sensoren haben Probleme und benötigen eine Wartung.',
  },
  [EntitiesSensorStatus.SensorStatusOnline]: {
    color: 'green-light',
    label: 'In Ordnung',
    description: 'Alle Sensoren sind online und können Daten senden.',
  },
} as const

type SensorStatusDetails = (typeof SensorStatusProperties)[EntitiesSensorStatus]

export const getSensorStatusDetails = (
  status: EntitiesSensorStatus
): SensorStatusDetails => {
  return SensorStatusProperties[status]
}
