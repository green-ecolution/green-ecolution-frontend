import { VehicleStatus } from '@green-ecolution/backend-client'

const VehicleStatusProperties = {
    [VehicleStatus.VehicleStatusUnknown]: {
        color: 'grey',
        bgcolor: 'none',
        label: 'Unbekannt',
        description: 'Der Fahrzeugstatus ist unbekannt.',
    },
    [VehicleStatus.VehicleStatusNotAvailable]: {
        color: 'red',
        bgcolor: 'none',
        label: 'Nicht Verfügbar',
        description: 'Das Fahrzeug ist nicht verfügbar.',
    },
    [VehicleStatus.VehicleStatusAvailable]: {
        color: 'green-dark',
        bgcolor: 'none',
        label: 'Verfügbar',
        description: 'Das ist Fahrzeug verfügbar.',
    },
    [VehicleStatus.VehicleStatusActive]: {
        color: 'green-light',
        bgcolor: 'green-light-200',
        label: 'Im Einsatz',
        description: 'Das Fahrzeug ist im Einsatz.',
    },
} as const

type VehicleStatusDetails = (typeof VehicleStatusProperties)[VehicleStatus]

export const getVehicleStatusDetails = (
    status: VehicleStatus
): VehicleStatusDetails => {
    return VehicleStatusProperties[status]
}
