import GeneralStatusCard from '@/components/general/cards/GeneralStatusCard';
import WateringStatusCard from '@/components/general/cards/WateringStatusCard';
import BackLink from '@/components/general/links/BackLink';
import GeneralLink from '@/components/general/links/GeneralLink';
import { treeDemoData } from '@/data/trees';
import { getWateringStatusDetails } from '@/hooks/useDetailsForWateringStatus';
import { EntitiesTreeClusterWateringStatus } from '@green-ecolution/backend-client';
import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { TreeDeciduous } from 'lucide-react';

export const Route = createFileRoute('/_protected/trees/$treeId')({
  component: SingleTree,

  loader: async ({ params }) => {
    const treeId = parseInt(params.treeId);
    return treeDemoData().find(tree => tree.id === treeId);
  },
})

function SingleTree() {
  const tree = useLoaderData({ from: '/_protected/trees/$treeId'});

  // TODO: Switch to real content
  const statusProDepth = [
    {
      status: EntitiesTreeClusterWateringStatus.TreeClusterWateringStatusGood,
      sensorCount: 1,
      value: "42,46 kΩ",
    },
    {
      status: EntitiesTreeClusterWateringStatus.TreeClusterWateringStatusGood,
      sensorCount: 1,
      value: "35,46 kΩ",
    },
    {
      status: EntitiesTreeClusterWateringStatus.TreeClusterWateringStatusModerate,
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
    <div className="container mt-6">
      <article className="2xl:w-4/5">
        <BackLink
          url="/map"
          label="Zum Kataster" />
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Baum: {tree.number}
        </h1>
        <p className="text-dark-600 text-lg mb-4">
          <span>@TODO: Bewässerungsgruppe hinzufügen, </span>
          <span>@TODO: Adresse der Bewässerungsgruppe</span>
        </p>
        <GeneralLink
          url={`/map?lat=${tree.latitude}&lng=${tree.longitude}`}
          label="Auf der Karte anzeigen" />
      </article>

      <div className="mt-10">
        <ul className="space-y-5 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-x-5">
          <li>
            <WateringStatusCard
              wateringStatus={tree.status} />
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
                      <dd className="inline">{card.sensorCount} Sensor(en)</dd>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
