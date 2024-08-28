import { useState } from 'react';
import TreeclusterCard from "@/components/general/cards/TreeclusterCard";
import Dialog from "@/components/general/filter/Dialog";
import { treeclusterDemoData } from "@/data/treecluster";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/treecluster/")({
  component: Treecluster,
});

function Treecluster() {
  const initialTreecluster = treeclusterDemoData();
  const [filteredTreecluster, setFilteredTreecluster] = useState(initialTreecluster);

  const handleFilter = (status: string[], regions: string[]) => {
    const filteredData = initialTreecluster.filter(cluster =>
      (status.length === 0 || status.includes(cluster.status)) &&
      (regions.length === 0 || regions.includes(cluster.region))
    );
    setFilteredTreecluster(filteredData);
  };

  return (
    <div className="container mt-6">
      <article className="2xl:w-4/5">
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Auflistung aller verfügbaren Baumgruppen
        </h1>
        <p>
          Eine Baumgruppe besteht aus bis zu 40 Bäumen, die die gleichen Standortbedingungen vorweisen. 
          Mindestens fünf Bäume in einer Baumgruppe sind mit Sensoren ausgestattet. 
          Diese gelieferten Werte werden gemittelt, sodass eine Handlungsempfehlung für die Baumgruppe gegeben werden kann.
        </p>
      </article>

      <section className="mt-16">
        <div className="mb-8 flex items-center justify-end lg:mb-12">
          <Dialog 
            headline="Filterung der Baumgruppen" 
            onApplyFilter={handleFilter}/>
        </div>

        <header className="hidden border-b pb-2 text-sm text-dark-800 px-8 border-b-dark-200 mb-5 lg:grid lg:grid-cols-[1fr,1.5fr,2fr,1fr] lg:gap-5 xl:px-10">
          <p>Status</p>
          <p>Name</p>
          <p>Standort</p>
          <p>Anzahl d. Bäume</p>
        </header>

        <ul>
          {filteredTreecluster.map((treecluster, key) => (
            <li key={key} className="mb-5 last:mb-0">
              <TreeclusterCard
                id={treecluster.id} 
                headline={treecluster.headline}
                number={treecluster.number}
                address={treecluster.address}
                region={treecluster.region}
                treeCount={treecluster.treeCount}
                sensorCount={treecluster.sensorCount}
                status={treecluster.status}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Treecluster;
