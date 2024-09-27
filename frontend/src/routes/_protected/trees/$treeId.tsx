import BackLink from '@/components/general/links/BackLink';
import GeneralLink from '@/components/general/links/GeneralLink';
import Tabs from '@/components/general/Tabs';
import Sensor from '@/components/icons/Sensor';
import Tree from '@/components/icons/Tree';
import TreeGeneralData from '@/components/tree/TreeGeneralData';
import TreeSensorData from '@/components/tree/TreeSensorData';
import TreeWateringStatus from '@/components/tree/TreeWateringStatus';
import { treeDemoData } from '@/data/trees';
import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { File } from 'lucide-react';

export const Route = createFileRoute('/_protected/trees/$treeId')({
  component: SingleTree,

  loader: async ({ params }) => {
    const treeId = parseInt(params.treeId);
    return treeDemoData().find(tree => tree.id === treeId);
  },
})

function SingleTree() {
  const tree = useLoaderData({ from: '/_protected/trees/$treeId'});

  const tabs = [
    {
      label: 'Bewässerungsdaten',
      icon: <Tree className="w-5 h-5" />,
      view: <TreeWateringStatus tree={tree} />
    },
    {
      label: 'Allgemeine Daten',
      icon: <File className="w-5 h-5" />,
      view: <TreeGeneralData tree={tree} />
    },
    {
      label: 'Sensordaten',
      icon: <Sensor className="w-5 h-5" />,
      view: <TreeSensorData tree={tree} />
    },
  ]

  return (
    <div className="container mt-6">
      <article className="mb-10 2xl:w-4/5">
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
 
      {tree.hasSensor ? (
        <Tabs tabs={tabs} />
      ) : (
        <TreeGeneralData tree={tree} />
      )}
    </div>
  )
}
