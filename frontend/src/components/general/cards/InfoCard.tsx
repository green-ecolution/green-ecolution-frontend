import React from 'react';

interface InfoCardProps  {
  headline: string;
  value: string | number;
  description: string;
  
}

const InfoCard: React.FC<InfoCardProps> = ({ headline, value, description }) => {
  return (
    <div className={`shadow-cards h-full p-6 rounded-xl group flex flex-col gap-4 transition-all ease-in-out duration-300 border true border-green-dark bg-green-dark-50 hover:bg-green-dark-100' : 'border-green-light bg-green-light-50 hover:bg-green-light-100'} `}>
    <p>{headline}</p>
    <h3 className="font-lato text-lg text-dark font-semibold">{value}</h3>
    <p>{description}</p>
  </div>
  );
};

export default InfoCard;