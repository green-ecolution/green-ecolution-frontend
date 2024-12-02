import { getVehicleStatusDetails } from '@/hooks/useDetailsForVehicleStatus'
import { Vehicle } from '@green-ecolution/backend-client'
import { Link } from '@tanstack/react-router'
import React from 'react'

interface VehicleCard {
  vehicle: Vehicle
}

const VehicleCard: React.FC<VehicleCard> = ({ vehicle }) => {
  const statusDetails = getVehicleStatusDetails(vehicle.status)

  const vehicleTypeMapping = {
    transporter: 'Transporter',
    trailer: 'Anhänger',
  }

  return (
    <Link
      to={`/vehicle/${vehicle.id}`}
      className="bg-white border border-dark-50 p-6 rounded-xl shadow-cards flex flex-col gap-y-4 transition-all ease-in-out duration-300 hover:bg-green-dark-50 hover:border-green-dark lg:grid lg:grid-cols-[1fr,1fr,1fr,1fr,1fr] lg:items-center lg:gap-5 lg:py-10 xl:px-10"
    >
      <div>
        <p
          className={`border rounded-full bg-${statusDetails.bgcolor} text-${statusDetails.color} px-3 py-1 inline-block`}
        >
          {statusDetails.label}
        </p>
      </div>

      <div>
        <h2 className="font-bold text-lg mb-0.5">{vehicle.numberPlate}</h2>
        <p className="text-dark-600 lg:block lg:text-sm">
          {vehicleTypeMapping[vehicle.type] || vehicle.type}
        </p>
      </div>

      <p>{vehicle.waterCapacity} Liter</p>
      <p>{vehicle.model}</p>
      <p>{vehicle.drivingLicense}</p>
    </Link>
  )
}

export default VehicleCard
