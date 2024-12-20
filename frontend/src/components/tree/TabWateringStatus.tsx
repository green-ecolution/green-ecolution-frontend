import { WateringStatus, Tree } from '@green-ecolution/backend-client';
import React from 'react';
import { TreeDeciduous } from 'lucide-react';
import { getWateringStatusDetails } from '@/hooks/useDetailsForWateringStatus';
import GeneralStatusCard from '../general/cards/GeneralStatusCard';
import EntitiesStatusCard from '../general/cards/EntitiesStatusCard';

interface TabWateringStatusProps {
  tree?: Tree,
}

const TabWateringStatus: React.FC<TabWateringStatusProps> = ({ tree }) => {
  // TODO: Switch to real content
  const statusProDepth = [
    {
      status: WateringStatus.WateringStatusGood,
      sensorCount: 1,
      value: "42,46 kΩ",
    },
    {
      status: WateringStatus.WateringStatusGood,
      sensorCount: 1,
      value: "35,46 kΩ",
    },
    {
      status: WateringStatus.WateringStatusModerate,
      sensorCount: 1,
      value: "28,12 kΩ",
    },
  ];

  // TODO: Switch to real content
  const statusCards = [
    {
      overline: "Bewässerungszustand (ø)",
      value: "35,02 kΩ",
      description: "+0.5% zu der letzten Messung.",
    },
    {
      overline: "Bodenfeuchte",
      value: "78 %",
      description: "-0.5% zu der letzten Messung.",
    },
    {
      overline: "Bodentemperatur",
      value: "12 °C",
      description: "- 0.5 °C zur letzten Messung",
    },
  ]

  return (
    <>
      <ul className="space-y-5 md:space-y-0 md:grid md:gap-5 md:grid-cols-2 lg:grid-cols-4">
        <li>
          <EntitiesStatusCard
            statusDetails={getWateringStatusDetails(tree?.wateringStatus ?? WateringStatus.WateringStatusUnknown)}
            label="Bewässerungszustand (ø)" />
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

      <section className="mt-20">
        <h2 className="font-bold font-lato text-xl mb-6 lg:mb-0">
          Bewässerungszustand pro Bodentiefe
        </h2>

        <div className="lg:grid lg:grid-cols-[auto,15rem] lg:items-end lg:gap-x-10 xl:gap-x-20 xl:grid-cols-[auto,20rem]">
          <div aria-hidden="true" className="mb-10 lg:mb-0 lg:w-60 lg:col-start-2 xl:w-80">
            <TreeDeciduous className="w-11 h-11 mx-auto mb-4" />
            <ul className="space-y-3">
              {statusProDepth.map((card, key) => (
                <li key={key} className={`rounded-xl text-center bg-${getWateringStatusDetails(card.status).color}-100 py-3`}>
                  <p className={`inline relative pl-8 before:absolute before:w-4 before:h-4 before:rounded-full before:left-2 before:top-[0.1rem] before:bg-${getWateringStatusDetails(card.status).color}`}>
                    <span className="font-semibold">{card.value}</span>
                    <span className="text-dark-800 font-normal"> · in {30 * (key + 1)}cm</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-start-1 lg:row-start-1">
            <header className="hidden border-b pb-2 text-sm text-dark-800 border-b-dark-200 lg:grid lg:grid-cols-[1.5fr,1fr,1fr] lg:gap-x-5">
              <p>Status</p>
              <p>Eingesetzte Tiefe</p>
              <p>Anzahl der Sensoren</p>
            </header>

            <ul className="space-y-3 lg:space-y-0">
              {statusProDepth.map((card, key) => (
                <li key={key} className="space-y-3 border-b border-b-dark-300 pb-3 lg:py-3 lg:space-y-0 lg:grid lg:grid-cols-[1.5fr,1fr,1fr] lg:gap-5">
                  <h3 className="font-medium text-lg lg:col-start-2 lg:row-start-1">
                    <span className="lg:hidden">Bodentiefe von </span>{30 * (key + 1)}cm
                  </h3>
                  <div className="lg:col-start-1 lg:row-start-1">
                    <dt className="inline lg:hidden">Bewässerungsstatus:</dt>
                    <dd className={`inline relative font-medium pl-8 before:absolute before:w-4 before:h-4 before:rounded-full before:left-2 before:top-[0.1rem] before:bg-${getWateringStatusDetails(card.status).color}`}>
                      {getWateringStatusDetails(card.status).label}
                    </dd>
                  </div>
                  <div>
                    <dt className="inline lg:hidden">Anzahl der Sensoren:</dt>
                    <dd className="inline"> {card.sensorCount} Sensor(en)</dd>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default TabWateringStatus;
