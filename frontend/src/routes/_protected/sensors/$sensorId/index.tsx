import { sensorIdQuery } from '@/api/queries'
import queryClient from '@/api/queryClient'
import LoadingInfo from '@/components/general/error/LoadingInfo'
import SensorDashboard from '@/components/sensor/SensorDashboard'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export const Route = createFileRoute('/_protected/sensors/$sensorId/')({
  component: SingleSensor,
  loader: async ({ params }) => {
    return {
      sensor: await queryClient.ensureQueryData(sensorIdQuery(params.sensorId)),
    }
  },
})

function SingleSensor() {
  const sensorId = Route.useParams().sensorId
  const { sensor } = Route.useLoaderData();

  return (
    <div className="container mt-6">
      <Suspense
        fallback={<LoadingInfo label="Sensordaten werden geladen …" />}
      >
        <ErrorBoundary
          fallback={
            <p className="text-red text-lg font-semibold">
              Einen Sensor mit der Identifikationsnummer {sensorId}{' '}
              gibt es nicht oder die Sensordaten konnten nicht
              geladen werden
            </p>
          }
        >
          <SensorDashboard sensor={sensor} />
        </ErrorBoundary>
      </Suspense>
    </div>
  )
}

export default SingleSensor
