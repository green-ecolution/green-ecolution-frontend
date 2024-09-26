import BackLink from '@/components/general/links/BackLink';
import GeneralLink from '@/components/general/links/GeneralLink';
import Tree from '@/components/icons/Tree';
import TreeGeneralData from '@/components/tree/TreeGeneralData';
import TreeWateringStatus from '@/components/tree/TreeWateringStatus';
import { treeDemoData } from '@/data/trees';
import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { File, PieChart, Trash } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/_protected/trees/$treeId')({
  component: SingleTree,

  loader: async ({ params }) => {
    const treeId = parseInt(params.treeId);
    return treeDemoData().find(tree => tree.id === treeId);
  },
})

function SingleTree() {
  const tree = useLoaderData({ from: '/_protected/trees/$treeId'});
  const [showTabIndex, setShowTabIndex] = useState(0);

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
      icon: <Trash className="w-5 h-5" />,
      view: <TreeWateringStatus tree={tree} />
    },
    {
      label: 'Auswertung',
      icon: <PieChart className="w-5 h-5" />,
      view: <TreeWateringStatus tree={tree} />
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
 
      <div role="tablist" className="mb-10 border-b border-b-dark-600 flex items-center w-max gap-x-6">
        {tabs.map((tab, key) => (
          <button 
            onClick={() => setShowTabIndex(key)} 
            key={key} 
            id={`tab-${key}`} 
            role="tab" 
            aria-selected={showTabIndex === key} 
            aria-controls={`tabpanel-${key}`}
            className={`flex items-center gap-x-2 pb-2 border-b transition-all ease-in-out duration-300 hover:text-dark-800 ${showTabIndex === key ? 'text-dark border-b-dark' : 'text-dark-600 border-b-transparent'}`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab, key) => (
        <div 
          key={key} 
          id={`tabpanel-${key}`} 
          role="tabpanel" 
          tabIndex={showTabIndex === key ? 0 : -1} 
          aria-labelledby={`tab-${key}`}
          className={`${showTabIndex === key ? 'block': 'hidden'}`}
        >
          {tab.view}
        </div>
      ))}
    </div>
  )
}
