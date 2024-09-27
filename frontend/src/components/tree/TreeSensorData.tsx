import React from 'react';
import GeneralStatusCard from '../general/cards/GeneralStatusCard';
import EntitiesStatusCard from '../general/cards/EntitiesStatusCard';
import { getSensorStatusDetails } from '@/hooks/useDetailsForSensorStatus';
import { EntitiesSensorStatus } from '@green-ecolution/backend-client';
import { useFormattedDate, useFormattedTime } from '@/hooks/useFormattedDate';

interface TreeSensorData {
  tree?: {
    sensor?: {
      id: number;
      status: EntitiesSensorStatus;
      updatedAt: string;
    };
  }
}

const TreeSensorData: React.FC<TreeSensorData> = ({ tree }) => {
  const statusCards = [
    {
      overline: "Letzte Messung",
      value: `${useFormattedTime(tree?.sensor?.updatedAt)}`,
      description: `am ${useFormattedDate(tree?.sensor?.updatedAt)}`,
    },
  ]

  const sensorStatus = tree?.sensor?.status ?? EntitiesSensorStatus.SensorStatusUnknown;

  return (
    <>
      <ul className="space-y-5 md:space-y-0 md:grid md:gap-5 md:grid-cols-2 lg:grid-cols-4">
        <li>
          <EntitiesStatusCard
            statusDetails={getSensorStatusDetails(sensorStatus)}
            label="Status der Sensoren" />
        </li>
        {statusCards.map((card, key) => (
          <li key={key}>
            <GeneralStatusCard
              overline={card.overline}
              value={card.value}
              isLarge
              description={card.description}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default TreeSensorData;
