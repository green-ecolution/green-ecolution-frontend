import React from 'react';
import GeneralStatusCard from '../general/cards/GeneralStatusCard';
import EntitiesStatusCard from '../general/cards/EntitiesStatusCard';
import { getSensorStatusDetails, SensorStatus } from '@/hooks/useDetailsForSensorStatus';

interface TreeSensorData {
  tree?: {
    id: number;
    species: string;
    number: number;
    heightAboveSeaLevel: number;
    plantingYear: number;
    age: number;
    updatedAt: string;
    latitude: number;
    longitude: number;
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
      <ul className="space-y-5 md:space-y-0 md:grid md:gap-5 md:grid-cols-2 lg:grid-cols-4">
        <li>
          <EntitiesStatusCard
            statusDetails={getSensorStatusDetails(SensorStatus.SensorStatusOnline)}
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
