import Tree from '@/components/icons/Tree';
import { getWateringStatusDetails } from '@/hooks/useDetailsForWateringStatus';
import { EntitiesTreeClusterWateringStatus } from '@green-ecolution/backend-client';
import { Link } from '@tanstack/react-router';
import { MapPin } from 'lucide-react';
import React from 'react';

interface TreeclusterCard {
  treecluster: {
    id: number;
    name: string; 
    number: string;
    address: string;
    region: string;
    treeCount: number;
    sensorCount: number;
    status: EntitiesTreeClusterWateringStatus;
  }
}

const TreeclusterCard: React.FC<TreeclusterCard> = ({ treecluster }) => {
    const statusDetails = getWateringStatusDetails(treecluster.status);

    return (
      <Link 
        to={`/treecluster/${treecluster.id}`}
        className="bg-white border border-dark-50 p-6 rounded-xl shadow-cards flex flex-col gap-y-4 transition-all ease-in-out duration-300 hover:bg-green-dark-50 hover:border-green-dark lg:grid lg:grid-cols-[1fr,1.5fr,2fr,1fr] lg:items-center lg:gap-5 lg:py-10 xl:px-10"
      >
        <p className={`relative font-medium pl-7 before:absolute before:w-4 before:h-4 before:rounded-full before:left-0 before:top-[0.22rem] 
          before:bg-${statusDetails.color}`}>
          {statusDetails.label}
        </p>

        <div>
          <h2 className="font-bold text-lg mb-0.5">{treecluster.name}</h2>
          <p className="text-dark-700 text-sm">ID-Nummer: {treecluster.number}</p>
        </div>

        <div className="text-dark-800 flex gap-x-2">
          <MapPin className="w-5 h-5" />
          <p>
            <span>{treecluster.address}, </span><br/>
            <span className="text-dark-600 lg:block lg:text-sm">{treecluster.region}</span>
          </p>
        </div>

        <div className="text-dark-800 flex gap-x-2">
          <Tree className="w-5 h-5 mt-0.5" />
          <p>
            {treecluster.treeCount} Bäume
            <span className="text-dark-600 lg:hidden"> | </span>
            <span className="text-dark-600 lg:block lg:text-sm">{treecluster.sensorCount} mit Sensoren</span>
          </p>
        </div>
      </Link>
    );
}

export default TreeclusterCard;
