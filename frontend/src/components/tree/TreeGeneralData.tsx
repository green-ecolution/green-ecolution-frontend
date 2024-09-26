import { EntitiesTreeClusterWateringStatus } from "@green-ecolution/backend-client";

interface TreeGeneralData {
  tree: {
    id: number;
    species: string;
    number: string;
    hasSensor: boolean;
    status: EntitiesTreeClusterWateringStatus;
  }
}

const TreeGeneralData: React.FC<TreeGeneralData> = ({ tree }) => {

  const treeData = [
    {
      label: 'Baumart',
      value: tree.species
    },
    {
      label: 'Höhe über NHN',
      value: '@TODO: Implement'
    },
    {
      label: 'Standalter',
      value: '@TODO: Implement'
    },
    {
      label: 'Pflanzjahr',
      value: '@TODO: Implement'
    },
    {
      label: 'Bewässerungsgruppe',
      value: '@TODO: Implement'
    },
    {
      label: 'Standort',
      value: '@TODO: Implement'
    },
    {
      label: 'Region',
      value: '@TODO: Implement'
    },
    {
      label: 'Bodenbeschaffenheit',
      value: '@TODO: Implement'
    },
  ];

  return (
    <>
      <dl className="text-lg md:columns-2 md:gap-x-11">
        {treeData.map((data, index) => (
          <div
            key={index}
            className={`py-4 border-b border-b-dark-200 group md:last:border-b-transparent 
              ${treeData.length/2 === index + 1 ? 'md:border-b-transparent' : ''}`}
            >
            <dt className="font-bold sm:inline">{data.label}:</dt>
            <dd className="sm:inline sm:px-2">{data.value}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-16">
        @TODO: Add image slider
      </section>
    </>
  );
}

export default TreeGeneralData;
