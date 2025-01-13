import queryClient from '@/api/queryClient'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { sensorIdQuery } from '@/api/queries'

export const Route = createFileRoute(
  '/_protected/sensors/$sensorId'
)({
  component: () => <Outlet />,
  loader: async ({ params }) => {
    return {
      sensor: await queryClient.ensureQueryData(
        sensorIdQuery(params.sensorId)
      ),
    }
  },
  meta: ({ loaderData: { sensor } }) => {
    return [
      {
        title: `Sensor ID: ${sensor.id}`,
      },
    ]
  },
})
