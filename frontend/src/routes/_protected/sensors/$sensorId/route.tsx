import queryClient from '@/api/queryClient'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { sensorIdQuery } from '@/api/queries'

export const Route = createFileRoute(
  '/_protected/sensors/$sensorId'
)({
  component: () => <Outlet />,
  loader: async ({ params }) => {
    const sensor = await queryClient.ensureQueryData(sensorIdQuery(params.sensorId))
    return {
      crumb: {
        title: `Sensor ID: ${sensor.id}`,
      }
    }
  },
})
