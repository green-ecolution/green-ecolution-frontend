import React from 'react';

interface EntitiesStatusCard {
  statusDetails: {label: string, color: string, description: string};
  label: string;
}

const EntitiesStatusCard: React.FC<EntitiesStatusCard> = ({ statusDetails, label }) => {
  const backgroundColor = statusDetails.color === 'dark-400' ? 'dark-50' : `${statusDetails.color}-100`;

  return (
    <div className={`h-full space-y-3 bg-${backgroundColor} rounded-xl p-6`}>
      <h2 className="text-sm text-dark-700 font-medium">{label}</h2>
      <p className={`relative pl-7 font-bold text-xl before:absolute before:w-4 before:h-4 before:rounded-full before:left-0 before:top-2 before:bg-${statusDetails.color}`}>
        {statusDetails.label}
      </p>
      <p className="text-sm">{statusDetails.description}</p>
    </div>
  );
}

export default EntitiesStatusCard;
