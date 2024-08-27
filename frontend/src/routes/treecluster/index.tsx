import FilterButton from "@/components/general/buttons/FilterButton";
import PrimaryButton from "@/components/general/buttons/PrimaryButton";
import SecondaryButton from "@/components/general/buttons/SecondaryButton";
import TreeclusterCard from "@/components/general/cards/TreeclusterCard";
import FilterCheckbox from "@/components/general/filter/FilterCheckbox";
import { Region } from "@/types/Region";
import { WateringStatus, WateringStatusColor } from "@/types/WateringStatus";
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
      address: 'Friesische Straße 31 - 40',
      region: Region.friesischerBerg,
      treeCount: 34,
      sensorCount: 4,
      status: WateringStatus.bad,
    },
    {
      id: 1,
      headline: 'Westliche Höhe/Exe',
      number: '12345678XY',
      address: 'Friesische Straße 31 - 40',
      region: Region.friesischerBerg,
      treeCount: 34,
      sensorCount: 4,
      status: WateringStatus.bad,
    },
    {
      id: 3,
      headline: 'Westliche Höhe/Exe',
      number: '12345678XY',
      address: 'Friesische Straße 31 - 40',
      region: Region.friesischerBerg,
      treeCount: 34,
      sensorCount: 4,
      status: WateringStatus.moderate,
    },
    {
      id: 4,
      headline: 'Westliche Höhe/Exe',
      number: '12345678XY',
      address: 'Friesische Straße 31 - 40',
      region: Region.friesischerBerg,
      treeCount: 34,
      sensorCount: 4,
      status: WateringStatus.good,
    },
    {
      id: 4,
      headline: 'Westliche Höhe/Exe',
      number: '12345678XY',
      address: 'Friesische Straße 31 - 40',
      region: Region.friesischerBerg,
      treeCount: 34,
      sensorCount: 4,
      status: WateringStatus.good,
    },
    {
      id: 5,
      headline: 'Westliche Höhe/Exe',
      number: '12345678XY',
      address: 'Friesische Straße 31 - 40',
      region: Region.friesischerBerg,
      treeCount: 34,
      sensorCount: 4,
      status: WateringStatus.good,
    },
    {
      id: 5,
      headline: 'Westliche Höhe/Exe',
      number: '12345678XY',
      address: 'Friesische Straße 31 - 40',
      region: Region.friesischerBerg,
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

      <section className="mt-16">
        <div className="mb-8 flex items-center justify-end lg:mb-12">
          <FilterButton ariaLabel="Baumgruppen filtern" />
        </div>

        <header className="hidden border-b pb-2 text-sm text-dark-800 px-8 border-b-dark-200 mb-5 lg:grid lg:grid-cols-[1fr,1.5fr,2fr,1fr] lg:gap-5 xl:px-10">
          <p>Status</p>
          <p>Name</p>
          <p>Standort</p>
          <p>Anzahl d. Bäume</p>
        </header>

        <ul>
          {treecluster.map((singleCluster, key) => (
            <li key={key} className="mb-5 last:mb-0">
              <TreeclusterCard
                id={singleCluster.id} 
                headline={singleCluster.headline}
                number={singleCluster.number}
                address={singleCluster.address}
                region={singleCluster.region}
                treeCount={singleCluster.treeCount}
                sensorCount={singleCluster.sensorCount}
                status={singleCluster.status}
              />
            </li>
          ))}
        </ul>
      </section>

      <section role="dialog" aria-modal="true" className="fixed inset-x-4 shadow-xl bg-white top-1/2 -translate-y-1/2 p-5 rounded-xl mx-auto max-w-[30rem]">
          <h2 className="text-xl font-semibold mb-5">Filterung der Baumgruppen</h2>

          <fieldset className="mb-5">
            <legend className="font-lato font-semibold text-dark-600 mb-2">
              Status der Bewässerung
            </legend>
            {Object.entries(WateringStatus).filter(([key]) => key !== 'unknown').map(([statusKey, statusValue]) => (
              <FilterCheckbox 
                key={statusKey}
                label={statusValue}
                name={`watering-${statusKey}`}
              >
                <div className={`bg-${WateringStatusColor[statusValue].color} w-4 h-4 rounded-full`} />
              </FilterCheckbox>
            ))}
          </fieldset>

          <fieldset className="mb-5">
            <legend className="font-lato font-semibold text-dark-600 mb-2">
              Regionen in Flensburg
            </legend>
              {Object.entries(Region).map(([statusKey, statusValue]) => (
                <FilterCheckbox 
                  key={statusKey}
                  label={statusValue}
                  name={`watering-${statusKey}`} />
            ))}
          </fieldset>

          <div className="flex flex-wrap gap-5">
            <PrimaryButton label="Anwenden" type="submit" />
            <SecondaryButton label="Abbrechen" />
          </div>
      </section>
    </div>
  );
}
