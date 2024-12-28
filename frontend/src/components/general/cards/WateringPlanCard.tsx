import { WateringPlan } from '@green-ecolution/backend-client'
import { Link } from '@tanstack/react-router'
import React from 'react'

interface WateringPlanCard {
  wateringPlan: WateringPlan
}

const WateringPlanCard: React.FC<WateringPlanCard> = ({ wateringPlan }) => {
  // const statusDetails = getVehicleStatusDetails(vehicle.status)
  // const vehicleType = getVehicleType(vehicle.type)

  return (
    <Link
      to={`/watering-plans/${wateringPlan.id}`}
      className="bg-white border border-dark-50 p-6 rounded-xl shadow-cards flex flex-col gap-y-4 transition-all ease-in-out duration-300 hover:bg-green-dark-50 hover:border-green-dark lg:grid lg:grid-cols-5 lg:items-center lg:gap-5 lg:py-10 xl:px-10"
    >
      {/* <Pill label={statusDetails.label} theme={statusDetails.color}></Pill> */}
      <p>Test</p>
      {/* <div>
        <h2 className="text-dark font-bold text-lg mb-0.5">
          <span className="lg:sr-only">Kennzeichen: </span>
          {wateringPlan.}
        </h2>
        <p className="text-dark-600 lg:text-sm">{vehicleType}</p>
      </div>

      <p className="text-dark-800">
        <span className="lg:sr-only">Wasserkapazität:&nbsp;</span>
        {vehicle.waterCapacity} Liter
      </p>

      <p className="text-dark-800">
        <span className="lg:sr-only">Modell:&nbsp;</span>
        {vehicle.model}
      </p>

      <p className="text-dark-800">
        <span className="lg:sr-only">Benötigte Führerscheinklasse:&nbsp;</span>
        {vehicle.drivingLicense}
      </p> */}
    </Link>
  )
}

export default WateringPlanCard
