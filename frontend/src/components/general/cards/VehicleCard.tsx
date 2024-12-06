import { getVehicleStatusDetails } from '@/hooks/useDetailsForVehicleStatus'
import { Vehicle } from '@green-ecolution/backend-client'
import { Link } from '@tanstack/react-router'
import Pill from '@/components/general/Pill'
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

  const pillTypeMapping = {
    "Unbekannt": 'dark-400',
    "Nicht verfügbar": 'red',
    "Verfügbar":  'green-light',
    "Im Einsatz": 'active',
  }

  return (
    <Link
      to={`/vehicle/${vehicle.id}`}
      className="bg-white border border-dark-50 p-6 rounded-xl shadow-cards flex flex-col gap-y-4 transition-all ease-in-out duration-300 hover:bg-green-dark-50 hover:border-green-dark lg:grid lg:grid-cols-5 lg:items-center lg:gap-5 lg:py-10 xl:px-10"
    >
      <Pill label={statusDetails.label} theme={pillTypeMapping[statusDetails.label] || 'dark-400'}></Pill>

      <div>
      <span className="lg:sr-only">Kennzeichen: </span>
        <h2 className="text-dark font-bold text-lg mb-0.5">{vehicle.numberPlate}</h2>
        <p className="text-dark-600 lg:block lg:text-sm">
          {vehicleTypeMapping[vehicle.type] || vehicle.type}
        </p>
      </div>

      <div>
        <span className="lg:sr-only">Wasserkapazität: </span>
        <p className="text-dark-800">{vehicle.waterCapacity} Liter</p>
      </div>

      <div>
        <span className="lg:sr-only">Modell: </span>
        <p className="text-dark-800">{vehicle.model}</p>
      </div>

      <div>
        <span className="lg:sr-only">Benötigte Führerscheinklasse: </span>
        <p className="text-dark-800">{vehicle.drivingLicense}</p>
      </div>
    </Link>
  )
}

export default VehicleCard
