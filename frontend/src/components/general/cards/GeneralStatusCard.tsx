import React from 'react';

interface GeneralStatusCard {
  overline: string;
  value: string | number;
  description?: string;
}

const GeneralStatusCard: React.FC<GeneralStatusCard> = ({ overline, value, description = '' }) => {
    return (
      <div className="h-full space-y-3 bg-dark-50 rounded-xl p-6">
        <h2 className="text-sm text-dark-700 font-medium">{overline}</h2>
        <p className="font-bold text-xl">{value}</p>
        {description && <p className="text-sm">{description}</p>}
      </div>
    );
}

export default GeneralStatusCard;
