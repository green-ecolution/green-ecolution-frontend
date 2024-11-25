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
  }

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
    </div>
  )
}

export default SingleSensor
