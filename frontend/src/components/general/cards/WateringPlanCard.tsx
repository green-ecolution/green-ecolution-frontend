import { WateringPlan } from '@green-ecolution/backend-client'
import { Link } from '@tanstack/react-router'
import React from 'react'

interface WateringPlanCard {
  wateringPlan: WateringPlan
}

const WateringPlanCard: React.FC<WateringPlanCard> = ({ wateringPlan }) => {

  return (
    <Link
      to={`/watering-plans/${wateringPlan.id}`}
      className="bg-white border border-dark-50 p-6 rounded-xl shadow-cards flex flex-col gap-y-4 transition-all ease-in-out duration-300 hover:bg-green-dark-50 hover:border-green-dark lg:grid lg:grid-cols-[1fr,1.5fr,1fr,1.5fr,1.5fr] lg:items-center lg:gap-5 lg:py-10 xl:px-10"
    >
      {/* <Pill label={statusDetails.label} theme={statusDetails.color}></Pill> */}
      <p>Test</p>
      <div>
        <h2 className="text-dark font-bold text-lg mb-0.5">
          <span className="lg:sr-only">Einsatzplan: </span>
          {wateringPlan.date}
        </h2>
        <p className="text-dark-600 lg:text-sm">
          {wateringPlan.transporter.numberPlate}
          {wateringPlan.trailer && <span> | {wateringPlan.trailer.numberPlate}</span>}
        </p>
      </div>

      <p className="text-dark-800">
        <span className="lg:sr-only">Länge:&nbsp;</span>
        {wateringPlan.distance} km
      </p>

      <p className="text-dark-800">
        <span className="lg:sr-only">Anzahl der Mitarbeitenden:&nbsp;</span>
        {wateringPlan.users.length}
      </p>

      <p className="text-dark-800">
        <span className="lg:sr-only">Anzahl der Bewässerungsgruppen:&nbsp;</span>
        {wateringPlan.treecluster.length}
      </p>
    </Link>
  )
}

export default WateringPlanCard
