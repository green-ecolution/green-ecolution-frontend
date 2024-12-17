import BackLink from '../general/links/BackLink'
import Pill from '../general/Pill'
import ButtonLink from '../general/links/ButtonLink'
import { Pencil } from 'lucide-react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { vehicleIdQuery } from '@/api/queries'
import { getVehicleStatusDetails } from '@/hooks/useDetailsForVehicleStatus'
import GeneralLink from '../general/links/GeneralLink'
import { VehicleStatus } from '@green-ecolution/backend-client'
import { getVehicleType } from '@/hooks/useDetailsForVehicleType'

interface VehicleDashboardProps {
  vehicleId: string
}

const VehicleDashboard = ({ vehicleId }: VehicleDashboardProps) => {
  const { data: vehicle } = useSuspenseQuery(vehicleIdQuery(vehicleId))
  const statusDetails = getVehicleStatusDetails(vehicle.status)
  const vehicleType = getVehicleType(vehicle.type)

  const vehicleData = [
    {
      label: 'Modell',
      value: vehicle?.model ?? 'Keine Angabe',
    },
    {
      label: 'Fahrzeug-Typ',
      value: vehicleType ?? 'Keine Angabe',
    },
    {
      label: 'Höhe des Fahrzeugs',
      value: vehicle?.height ? `${vehicle.height} Meter` : 'Keine Angabe',
    },
    {
      label: 'Breite des Fahrzeugs',
      value: vehicle?.width ? `${vehicle.width} Meter` : 'Keine Angabe',
    },
    {
      label: 'Benötigte Führerscheinklasse',
      value: vehicle?.drivingLicense ?? 'Keine Angabe',
    },
    {
      label: 'Nummernschild',
      value: vehicle?.numberPlate ?? 'Keine Angabe',
    },
    {
      label: 'Länge des Fahrzeugs',
      value: vehicle?.length ? `${vehicle.length} Meter` : 'Keine Angabe',
    },
  ]

  return (
    <>
      <BackLink link={{ to: '/vehicles' }} label="Zur Fahrzeugübersicht" />
      <article className="space-y-6 2xl:space-y-0 2xl:flex 2xl:items-center 2xl:space-x-10">
        <div className="2xl:w-4/5">
          <h1 className="font-lato font-bold text-3xl mb-4 flex flex-wrap items-center gap-4 lg:text-4xl xl:text-5xl">
            Fahrzeug: {vehicle.numberPlate}
            <Pill label={statusDetails?.label ?? "Keine Angabe"} theme={statusDetails?.color ?? 'grey'} />
          </h1>
          {vehicle.description && <p className="mb-4">{vehicle.description}</p>}
        </div>
        <ButtonLink
          icon={Pencil}
          iconClassName="stroke-1"
          label="Fahrzeug bearbeiten"
          color="grey"
          link={{
            to: `/vehicles/$vehicleId/edit`,
            params: { vehicleId: String(vehicle.id) },
          }}
        />
      </article>
      {vehicle.status == VehicleStatus.VehicleStatusActive && (
        <div className="h-full shadow-cards space-y-3 rounded-xl border border-green-light bg-green-light-50 p-6 mt-6">
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold">Dieses Fahrzeug befindet sich im Einsatz.</p>
            <GeneralLink
              label="Zum Einsatzplan"
              link={{
                to: '/vehicles', // TODO: link to linked watering plan
              }}
            />
          </div>
        </div>
      )}
      <section className="mt-16">
        <h2 className="font-lato font-bold text-2xl mb-4">
          Daten zum Fahrzeug
        </h2>
        <dl className="text-lg md:columns-2 md:gap-x-11">
          {vehicleData.map((data, index) => (
            <div
              key={index}
              className={`py-4 border-b border-b-dark-200 group md:last:border-b-transparent 
              ${vehicleData.length / 2 === index + 1 ? 'md:border-b-transparent' : ''}`}
            >
              <dt className="font-bold sm:inline">{data.label}:</dt>
              <dd className="sm:inline sm:px-2">{data.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  )
}

export default VehicleDashboard
