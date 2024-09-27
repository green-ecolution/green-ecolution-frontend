import { EntitiesTreeClusterWateringStatus } from '@green-ecolution/backend-client';
import React from 'react';
import GeneralStatusCard from '../general/cards/GeneralStatusCard';
import EntitiesStatusCard from '../general/cards/EntitiesStatusCard';
import { getSensorStatusDetails, SensorStatus } from '@/hooks/useDetailsForSensorStatus';

interface TreeSensorData {
  tree: {
    id: number;
    species: string;
    number: string;
    hasSensor: boolean;
    status: EntitiesTreeClusterWateringStatus;
    sensor: SensorStatus;
  }
}

const TreeSensorData: React.FC<TreeSensorData> = ({ tree }) => {

  // TODO: Switch to real content
  const statusCards = [
    {
      overline: "Letzte Messung",
      value: "13:27 Uhr",
      description: "am 26. Juli 2024",
    },
  ]

  return (
    <>
      <ul className="space-y-5 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-x-5">
        <li>
          <EntitiesStatusCard
            statusDetails={getSensorStatusDetails(tree.sensor)}
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
