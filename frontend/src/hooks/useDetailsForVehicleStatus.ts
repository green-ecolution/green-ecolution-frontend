import { VehicleStatus } from '@green-ecolution/backend-client'

const VehicleStatusProperties = {
    [VehicleStatus.VehicleStatusUnknown]: {
        color: 'dark-400',
        bgcolor: 'none',
        label: 'Unbekannt',
        description: 'Der Fahrzeugstatus ist unbekannt.',
        colorHex: '#A2A2A2',
    },
    [VehicleStatus.VehicleStatusNotAvailable]: {
        color: 'red',
        bgcolor: 'none',
        label: 'Nicht Verfügbar',
        description: 'Das Fahrzeug ist nicht verfügbar.',
        colorHex: '#E44E4D',
    },
    [VehicleStatus.VehicleStatusAvailable]: {
        color: 'yellow',
        bgcolor: 'none',
        label: 'Verfügbar',
        description: 'Das ist Fahrzeug verfügbar.',
        colorHex: '#FFC434',
    },
    [VehicleStatus.VehicleStatusActive]: {
        color: 'green-dark',
        bgcolor: 'green-light-200',
        label: 'Im Einsatz',
        description: 'Das Fahrzeug ist im Einsatz.',
        colorHex: '#ACB63B',
    },
} as const

type VehicleStatusDetails = (typeof VehicleStatusProperties)[VehicleStatus]

export const getVehicleStatusDetails = (
    status: VehicleStatus
): VehicleStatusDetails => {
    return VehicleStatusProperties[status]
}