import BackLink from '../general/links/BackLink'
import Pill from '../general/Pill'
import ButtonLink from '../general/links/ButtonLink'
import { Pencil } from 'lucide-react'
import VehicleGeneralData from './VehicleGeneralData'
import { useSuspenseQuery } from '@tanstack/react-query'
import { vehicleIdQuery } from '@/api/queries'
import { getVehicleStatusDetails } from '@/hooks/useDetailsForVehicleStatus'
import GeneralLink from '../general/links/GeneralLink'
import { VehicleStatus } from '@green-ecolution/backend-client'

interface VehicleDashboardProps {
  vehicleId: string
}

const VehicleDashboard = ({ vehicleId }: VehicleDashboardProps) => {
  const { data: vehicle } = useSuspenseQuery(vehicleIdQuery(vehicleId))
  const statusDetails = getVehicleStatusDetails(vehicle.status)

  return (
    <>
      <BackLink link={{ to: '/vehicles' }} label="Zur Fahrzeugübersicht" />
      <article className="space-y-6 2xl:space-y-0 2xl:flex 2xl:items-center 2xl:space-x-10">
        <div className="2xl:w-4/5">
          <h1 className="font-lato font-bold text-3xl mb-4 flex flex-wrap items-center gap-4 lg:text-4xl xl:text-5xl">
            Fahrzeug: {vehicle.numberPlate}
            <Pill label={statusDetails.label} theme={statusDetails.color} />
          </h1>
          <p>
            Deserunt veniam amet nulla nulla sint excepteur aliqua voluptate
            aliquip sit amet ipsum voluptate aliquip excepteur. Occaecat fugiat
            in reprehenderit pariatur in voluptate nostrud enim.
          </p>
        </div>
        <ButtonLink
          icon={Pencil}
          iconClassName="stroke-1"
          label="Fahrzeug bearbeiten"
          color="grey"
          link={{
            to: `/vehicle/$vehicleId/edit`,
            params: { vehicleId: String(vehicle.id) },
          }}
        />
      </article>
      {vehicle.status == VehicleStatus.VehicleStatusActive && (
        <div className="h-full space-y-3 bg-dark-50 rounded-xl border border-green-light bg-green-light-50 p-6 mt-5">
          <div className="flex items-center justify-between">
            <p className="text-xl">Dieses Fahrzeug befindet sich im Einsatz.</p>
            <GeneralLink
              label="Zum Einsatzplan"
              link={{
                to: '/vehicles', //this is still missing
              }}
            />
          </div>
        </div>
      )}
      <section className="mt-10">
        <VehicleGeneralData vehicle={vehicle} />
      </section>
    </>
  )
}

export default VehicleDashboard
