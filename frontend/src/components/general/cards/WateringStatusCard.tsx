import { WateringStatus, WateringStatusColor, WateringStatusDescription } from '@/types/WateringStatus';
import React from 'react';

interface WateringStatusCard {
  wateringStatus: WateringStatus;
}

const WateringStatusCard: React.FC<WateringStatusCard> = ({ wateringStatus }) => {
    const statusColor = WateringStatusColor[wateringStatus].color;
    const description = WateringStatusDescription[wateringStatus];

    return (
      <div className={`h-full space-y-3 bg-${statusColor}-100 rounded-xl p-6`}>
        <h2 className="text-sm text-dark-700 font-medium">Bewässerungszustand (ø)</h2>
        <p className={`relative pl-7 font-bold text-xl before:absolute before:w-4 before:h-4 before:rounded-full before:left-0 before:top-2 before:bg-${statusColor}`}>
          {wateringStatus}
        </p>
        <p className="text-sm">{description}</p>
      </div>
    );
}

export default WateringStatusCard;
