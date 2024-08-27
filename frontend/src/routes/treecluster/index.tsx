import TreeclusterCard from "@/components/general/cards/TreeclusterCard";
import { WateringStatus } from "@/types/WateringStatus";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/treecluster/")({
  component: Treecluster,
});

function Treecluster() {

  const treecluster = [
    {
      id: 0,
      headline: 'Westliche Höhe/Exe',
      number: '12345678XY',
      address: 'Friesische Straße 31 - 40, Fiesischer Berg',
      treeCount: 34,
      sensorCount: 4,
      status: WateringStatus.bad,
    },
    {
      id: 1,
      headline: 'Westliche Höhe/Exe',
      number: '12345678XY',
      address: 'Friesische Straße 31 - 40, Fiesischer Berg',
      treeCount: 34,
      sensorCount: 4,
      status: WateringStatus.bad,
    },
    {
      id: 3,
      headline: 'Westliche Höhe/Exe',
      number: '12345678XY',
      address: 'Friesische Straße 31 - 40, Fiesischer Berg',
      treeCount: 34,
      sensorCount: 4,
      status: WateringStatus.moderate,
    },
    {
      id: 4,
      headline: 'Westliche Höhe/Exe',
      number: '12345678XY',
      address: 'Friesische Straße 31 - 40, Fiesischer Berg',
      treeCount: 34,
      sensorCount: 4,
      status: WateringStatus.good,
    },
  ];

  return (
    <div className="container mt-6">
      <article className="2xl:w-4/5">
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Auflistung aller verfügbaren Baumgruppen
        </h1>
        <p>
          Eine Baumgruppe besteht aus bis zu 40 Bäumen, die die gleichen Standortbedingungen vorweisen. 
          Mindestes fünf Bäume in einer Baumgruppe ist mit Sensoren ausgestattet. 
          Diese gelieferten Werte werden gemittelt, sodass eine Handlungsempfehlung für die Baumgruppe gegeben werden kann.
        </p>
      </article>

      <ul className="mt-16">
        {treecluster.map((singleCluster, key) => (
          <li key={key} className="mb-5 last:mb-0">
            <TreeclusterCard
              id={singleCluster.id} 
              headline={singleCluster.headline}
              number={singleCluster.number}
              address={singleCluster.address}
              treeCount={singleCluster.treeCount}
              sensorCount={singleCluster.sensorCount}
              status={singleCluster.status}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
