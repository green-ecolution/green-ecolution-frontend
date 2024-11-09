import { Sensor } from "@green-ecolution/backend-client";
import { format } from 'date-fns'
import React from "react";
import Pill from "../Pill";
import { getSensorStatusDetails } from "@/hooks/useDetailsForSensorStatus";

interface SensorCard {
  sensor: Sensor;
}

const SensorCard: React.FC<SensorCard> = ({ sensor }) => {
  const statusDetails = getSensorStatusDetails(sensor.status);
  const updatedDate = sensor?.updatedAt
    ? format(new Date(sensor?.updatedAt), 'dd.MM.yyyy')
    : 'Keine Angabe'

  return (
    <div className="bg-white border border-dark-50 p-6 rounded-xl shadow-cards flex flex-col gap-y-4 lg:grid lg:grid-cols-[1fr,2fr,1.5fr,1fr] lg:items-center lg:gap-5 lg:py-10 xl:px-10">
      <Pill label={statusDetails.label} theme={statusDetails.color} />
      <div>
        <h2 className="font-bold text-lg mb-0.5">ID: {sensor.id}</h2>
        <p className="text-dark-800">@TODO: get linked Tree</p>
      </div>
      <p className="text-dark-800">
        Erstellt am: <span className="lg:block">{updatedDate}</span>
      </p>
      @TODO: verlinkung
    </div>
  );
};

export default SensorCard;
