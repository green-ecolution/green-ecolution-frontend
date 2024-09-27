import { format, parse } from "date-fns";


interface TreeGeneralData {
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

const TreeGeneralData: React.FC<TreeGeneralData> = ({ tree }) => {
  const updatedDate = tree?.updatedAt 
    ? format(new Date(tree?.updatedAt), 'dd.MM.yyyy')
    : 'Keine Angabe';

  const treeData = [
    {
      label: 'Baumart',
      value: tree?.species ?? 'Keine Angabe',
    },
    {
      label: 'Höhe über NHN',
      value: tree?.heightAboveSeaLevel ?? 'Keine Angabe',
    },
    {
      label: 'Standalter',
      value: tree?.age ?? 'Keine Angabe',
    },
    {
      label: 'Pflanzjahr',
      value: tree?.plantingYear ?? 'Keine Angabe',
    },
    {
      label: 'Bewässerungsgruppe',
      value: '@TODO: Implement'
    },
    {
      label: 'Latitude',
      value: tree?.longitude ?? 'Keine Angabe',
    },
    {
      label: 'Longitude',
      value: tree?.latitude ?? 'Keine Angabe',
    },
    {
      label: 'Letztes Update',
      value: updatedDate,
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
