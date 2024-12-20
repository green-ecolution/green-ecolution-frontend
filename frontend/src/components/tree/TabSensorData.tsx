import React from 'react'
import GeneralStatusCard from '../general/cards/GeneralStatusCard'
import EntitiesStatusCard from '../general/cards/EntitiesStatusCard'
import { getSensorStatusDetails } from '@/hooks/useDetailsForSensorStatus'
import { SensorStatus, Tree } from '@green-ecolution/backend-client'
import { format } from 'date-fns'
import GeneralLink from '../general/links/GeneralLink'

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

  const statusCards = [
    {
      overline: 'Letzte Messung',
      value: `${updatedTime} Uhr`,
      description: `am ${updatedDate}`,
    },
  ]

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
        {statusCards.map((card, key) => (
          <li key={key}>
            <GeneralStatusCard
              overline={card.overline}
              value={card.value}
              isLarge
              description={card.description}
            />
          </li>
        ))}
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
