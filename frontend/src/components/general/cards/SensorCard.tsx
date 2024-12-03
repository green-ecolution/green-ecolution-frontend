import { Sensor } from '@green-ecolution/backend-client'
import { format } from 'date-fns'
import React from 'react'
import Pill from '../Pill'
import { getSensorStatusDetails } from '@/hooks/useDetailsForSensorStatus'
import { useSuspenseQuery } from '@tanstack/react-query'
import { treeSensorIdQuery } from '@/api/queries'
import GeneralLink from '../links/GeneralLink'

interface SensorCard {
  sensor: Sensor
}

const SensorCard: React.FC<SensorCard> = ({ sensor }) => {
  const sensorId = String(sensor.id)
  const { data: treeRes } = useSuspenseQuery(treeSensorIdQuery(sensorId))
  const statusDetails = getSensorStatusDetails(sensor.status)
  const updatedDate = sensor?.updatedAt
    ? format(new Date(sensor?.updatedAt), 'dd.MM.yyyy')
    : 'Keine Angabe'

  return (
    <div className="bg-white border border-dark-50 p-6 rounded-xl shadow-cards flex flex-col gap-y-4 lg:grid lg:grid-cols-[1fr,2fr,1.5fr,1fr] lg:items-center lg:gap-5 lg:py-10 xl:px-10">
      <Pill label={statusDetails.label} theme={statusDetails.color} />
      <div>
        <h2 className="font-bold text-lg mb-0.5">ID: {sensor.id}</h2>
        {treeRes ? (
          <p className="text-dark-800 text-sm">
            <span className={`${treeRes.treeNumber ? 'block' : 'hidden'}`}>
              Baum: {treeRes.treeNumber}
            </span>
            <span className={`${treeRes.treeNumber ? 'block' : 'hidden'}`}>
              Ort: {treeRes.latitude}, {treeRes.longitude}
            </span>
          </p>
        ) : (
          <p className="text-red">Keine Verknüpfung</p>
        )}
      </div>
      <p className="text-dark-800">
        Erstellt am: <span className="lg:block">{updatedDate}</span>
      </p>
      {treeRes ? (
        <GeneralLink
          label="Zur Verknüpfung"
          link={{
            to: '/tree/$treeId',
            params: { treeId: String(treeRes.id) },
          }}/>
        ) : (
          <p className="text-red">@TODO:Verknüpfung erstellen</p>
        )}
    </div>
  )
}

export default SensorCard
