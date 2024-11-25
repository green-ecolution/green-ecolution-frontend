import EntitiesStatusCard from '@/components/general/cards/EntitiesStatusCard'
import GeneralStatusCard from '@/components/general/cards/GeneralStatusCard'
import BackLink from '@/components/general/links/BackLink'
import { getVoltageQualityDetails } from '@/hooks/useDetailsForSensorBattery'
import { getSensorStatusDetails } from '@/hooks/useDetailsForSensorStatus'
import { SensorStatus } from '@green-ecolution/backend-client'
import { createFileRoute } from '@tanstack/react-router'
import { formatDistance, subDays } from 'date-fns'
import { de } from 'date-fns/locale'

export const Route = createFileRoute('/_protected/sensors/$sensorId/')({
  component: SingleSensor,
  // loader: async ({ params }) => {
  //   return {
  //     sensor: await queryClient.ensureQueryData(
  //       sensorIdQuery(params.sensorId)
  //     ),
  //   }
  // },
})

function SingleSensor() {
  const exampleSensor = {
    id: '12345678',
    status: SensorStatus.SensorStatusOffline,
    battery: 3.5,
    updated_at: formatDistance(subDays(new Date(), 3), new Date(), {
      addSuffix: true,
      locale: de,
    }),
    created_at: formatDistance(subDays(new Date(), 3), new Date(), {
      addSuffix: true,
      locale: de,
    }),
  }

  const generalSensorData = [
    {
      label: 'Anzahl verbaute Sensoren',
      value: '3 Sensoren',
    },
    {
      label: 'Erstellt am',
      value: exampleSensor.created_at ?? 'Keine Angabe',
    },
    {
      label: 'Letztes Update',
      value: exampleSensor.updated_at ?? 'Keine Angabe',
    },
    {
      label: 'Latitude',
      value: '54.12345',
    },
    {
      label: 'Longitude',
      value: '9.12345',
    },
  ]

  return (
    <div className="container mt-6">
      <BackLink link={{ to: '/sensors' }} label="Zu allen Sensoren" />
      <article className="space-y-6 2xl:space-y-0 2xl:flex 2xl:items-center 2xl:space-x-10">
        <div className="2xl:w-4/5">
          <h1 className="font-lato font-bold text-3xl mb-4 flex flex-wrap items-center gap-4 lg:text-4xl xl:text-5xl">
            Sensor ID: {exampleSensor.id}
          </h1>
          <p>
            Jeder Sensor sollte mit einer Vegetationsform verknüpft sein. Auf
            dieser Untersichtsseite wird veranschaulicht, ob der aktuelle Sensor
            Daten liefern kann, wann der Sensor das letzte Mal Daten geliefert
            hat und wie der aktuelle Akkustand des Sensors ist. Falls der Sensor
            zu keinem Baum oder Beet hinzugefügt worden ist, kann hier die
            Verknüpfung manuell hergestellt werden.
          </p>
        </div>
      </article>

      <section className="mt-10">
        <ul className="space-y-5 md:space-y-0 md:grid md:gap-5 md:grid-cols-2 lg:grid-cols-3">
          <li>
            <EntitiesStatusCard
              statusDetails={getSensorStatusDetails(exampleSensor.status)}
              label="Status des Sensors"
            />
          </li>
          <li>
            <EntitiesStatusCard
              statusDetails={getVoltageQualityDetails(exampleSensor.battery)}
              label="Akkustand"
            />
          </li>
          <li>
            <GeneralStatusCard
              overline="Letzte Messung"
              value={exampleSensor.updated_at}
              description="Letzte Datenübermittlung"
            />
          </li>
        </ul>
      </section>

      <section className="mt-16 md:grid md:gap-x-11 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-lato font-bold mb-4">Daten zum Sensor</h2>
          <dl className="text-lg">
            {generalSensorData.map((data, index) => (
              <div
                key={index}
                className="py-4 border-b border-b-dark-200 group md:last:border-b-transparent last:border-b-transparent"
              >
                <dt className="font-bold sm:inline">{data.label}:</dt>
                <dd className="sm:inline sm:px-2">{data.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        
        <div className="h-max space-y-3 bg-dark-50 rounded-xl p-6">
          <h2 className="text-sm text-dark-700 font-medium">Verknüpfte Vegetation</h2>
          <p className="font-bold text-3xl">Baum XY</p>
          <p className="text-sm">Test</p>
        </div>
      </section>
    </div>
  )
}

export default SingleSensor
