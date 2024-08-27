import Tree from '@/components/icons/Tree';
import { WateringStatus, WateringStatusColor } from '@/types/WateringStatus';
import { Link } from '@tanstack/react-router';
import { MapPin } from 'lucide-react';
import React from 'react';

interface TreeclusterCard {
  id: number;
  headline: string;
  number: string;
  address: string;
  treeCount: number;
  sensorCount: number;
  status: WateringStatus;
}

const TreeclusterCard: React.FC<TreeclusterCard> = ({ id, headline, number, address, treeCount, sensorCount, status }) => {

    const statusColor = WateringStatusColor[status].color;

    return (
      <Link 
        to={`/treecluster/${id}`}
        className="bg-white border border-dark-50 p-6 rounded-xl shadow-cards flex flex-col gap-y-4 transition-all ease-in-out duration-300 hover:bg-green-dark-50 hover:border-green-dark"
      >
        <p className={`relative font-medium pl-7 before:absolute before:w-4 before:h-4 before:rounded-full before:left-0 before:top-[0.22rem] 
          before:bg-${statusColor}`}>
          {status}
        </p>

        <div>
          <h2 className="font-bold text-lg mb-0.5">{headline}</h2>
          <p className="text-dark-700 text-sm">ID-Nummer: {number}</p>
        </div>
        
        <p className="text-dark-800 flex flex-wrap gap-x-2 items-center">
          <MapPin className="w-5 h-5" />
          {address}
        </p>

        <p className="text-dark-800 flex flex-wrap gap-x-2 items-center">
          <Tree className="w-5 h-5" />
          {treeCount} Bäume <span className="text-dark-600">| davon {sensorCount} mit Sensoren</span>
        </p>
      </Link>
    );
}

export default TreeclusterCard;
