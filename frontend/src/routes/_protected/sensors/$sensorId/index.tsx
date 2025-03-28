import { sensorIdQuery } from '@/api/queries'
import queryClient from '@/api/queryClient'
import LoadingInfo from '@/components/general/error/LoadingInfo'
import SensorDashboard from '@/components/sensor/SensorDashboard'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

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

  return (
    <div className="container mt-6">
      <Suspense
        fallback={<LoadingInfo label="Sensordaten werden geladen …" />}
      >
        <SensorDashboard sensorId={sensorId} />
      </Suspense>
    </div>
  )
}

export default SingleSensor
