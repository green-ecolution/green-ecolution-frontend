import { Link } from '@tanstack/react-router';
import { MoveRight } from 'lucide-react';
import React from 'react';

interface DashboardCard {
  headline: string;
  description: string;
  linkLabel: string;
  url: string;
  isDark: boolean;
}

const DashboardCard: React.FC<DashboardCard> = ({ headline, description, linkLabel, url, isDark }) => {
    return (
      <Link 
      to={url}
      aria-label={linkLabel}
      className={`shadow-card p-6 rounded-xl group flex flex-col gap-4 transition-all ease-in-out duration-300 border 
        ${isDark ? 'border-green-dark bg-green-dark-50 hover:bg-green-dark-100' : 'border-green-light bg-green-light-50 hover:bg-green-light-100'} `}
    >
      <h3 className="font-lato text-lg text-dark font-semibold">{headline}</h3>
      <p>{description}</p>
      <p className="font-lato font-semibold text-green-dark flex items-center gap-x-2">
        <span>{linkLabel}</span>
        <MoveRight className="transition-all ease-in-out duration-300 group-hover:translate-x-2"/>
      </p>
    </Link>
    );
}

export default DashboardCard;
