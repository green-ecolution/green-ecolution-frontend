import React from 'react'
import GeneralStatusCard from '../general/cards/GeneralStatusCard'
import EntitiesStatusCard from '../general/cards/EntitiesStatusCard'
import { getSensorStatusDetails } from '@/hooks/useDetailsForSensorStatus'
import { SensorStatus, Tree } from '@green-ecolution/backend-client'
import { format } from 'date-fns'
import GeneralLink from '../general/links/GeneralLink'
import { getVoltageQualityDetails } from '@/hooks/useDetailsForSensorBattery'

interface TabSensorDataProps {
  tree?: Tree
}

const TabSensorData: React.FC<TabSensorDataProps> = ({ tree }) => {
  const updatedDate = tree?.sensor?.updatedAt
    ? format(new Date(tree?.sensor?.updatedAt), 'dd.MM.yyyy')
    : 'Keine Angabe'
  const updatedTime = tree?.sensor?.updatedAt
    ? format(new Date(tree?.sensor?.updatedAt), 'HH:mm')
    : 'Keine Angabe'

  const sensorStatus = tree?.sensor?.status ?? SensorStatus.SensorStatusUnknown

  return (
    <>
      <ul className="mb-5 space-y-5 md:space-y-0 md:grid md:gap-5 md:grid-cols-2 lg:grid-cols-3">
        <li>
          <EntitiesStatusCard
            statusDetails={getSensorStatusDetails(sensorStatus)}
            label="Status der Sensoren"
          />
        </li>
        <li>
          <EntitiesStatusCard
            statusDetails={getVoltageQualityDetails(
              tree?.sensor?.latestData?.battery ?? null
            )}
            label="Akkustand"
          />
        </li>
        <li>
          <GeneralStatusCard
            overline="Letzte Messung"
            value={`${updatedTime} Uhr`}
            isLarge
            description={`am ${updatedDate}`}
          />
        </li>
      </ul>
      <GeneralLink
        label="Zum Verknüpften Sensor"
        link={{
          to: '/sensors/$sensorId',
          params: { sensorId: String(tree?.sensor?.id) },
        }}
      />
    </>
  )
}

export default TabSensorData
