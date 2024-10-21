import React from 'react';
import GeneralStatusCard from '../general/cards/GeneralStatusCard';
import EntitiesStatusCard from '../general/cards/EntitiesStatusCard';
import { getSensorStatusDetails } from '@/hooks/useDetailsForSensorStatus';
import { SensorStatus, Tree } from '@green-ecolution/backend-client';
import { format } from 'date-fns';

interface TreeSensorData {
  tree?: Tree,
}

const TreeSensorData: React.FC<TreeSensorData> = ({ tree }) => {
  const updatedDate = tree?.updatedAt 
    ? format(new Date(tree?.updatedAt), 'dd.MM.yyyy')
    : 'Keine Angabe';
    const updatedTime = tree?.updatedAt 
    ? format(new Date(tree?.updatedAt), 'HH:mm')
    : 'Keine Angabe';

  const statusCards = [
    {
      overline: "Letzte Messung",
      value: `${updatedTime} Uhr`,
      description: `am ${updatedDate}`,
    },
  ]

  const sensorStatus = tree?.sensor?.status ?? SensorStatus.SensorStatusUnknown;

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
