import { VehicleType } from '@green-ecolution/backend-client';

const VehicleTypeLabels = {
    [VehicleType.VehicleTypeTrailer]: 'Anhänger',
    [VehicleType.VehicleTypeTransporter]: 'Transporter',
    [VehicleType.VehicleTypeUnknown]: 'Unbekannt',
} as const;

export const getVehicleType = (type: VehicleType): string => VehicleTypeLabels[type];
