import { WateringStatus, WateringStatusColor } from '@/types/WateringStatus';
import { Link } from '@tanstack/react-router';
import { MoveRight } from 'lucide-react';
import React from 'react';

interface TreeCard {
  tree: {
    id: number;
    species: string; 
    number: string;
    hasSensor: boolean;
    status: WateringStatus;
  }
}

const TreeCard: React.FC<TreeCard> = ({ tree }) => {

    const statusColor = WateringStatusColor[tree.status].color;

    return (
      <Link 
        to={`/tree/${tree.id}`}
        className="bg-white group border border-dark-50 p-6 rounded-xl shadow-cards flex flex-col gap-y-4 transition-all ease-in-out duration-300 hover:bg-green-dark-50 hover:border-green-dark lg:grid lg:grid-cols-[1fr,1.5fr,2fr,1fr] lg:items-center lg:gap-5 lg:py-5 xl:px-10"
      >
        <p className={`relative font-medium pl-7 before:absolute before:w-4 before:h-4 before:rounded-full before:left-0 before:top-[0.22rem] 
          before:bg-${statusColor}`}>
          {tree.status}
        </p>
        <h3 className="text-lg font-bold font-lato">{tree.species}</h3>
        <p className="text-dark-700"><span className="lg:sr-only">Baumnummer: </span>{tree.number}</p>

        {tree.hasSensor && 
          <p className="font-lato font-semibold text-green-dark flex items-center gap-x-2">
            <span>Zur Detailansicht</span>
            <MoveRight className="transition-all ease-in-out duration-300 group-hover:translate-x-2"/>
          </p>
        }
      </Link>
    );
}

export default TreeCard;
