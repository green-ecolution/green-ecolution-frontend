import { vehicleIdQuery } from '@/api/queries'
import queryClient from '@/api/queryClient'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/vehicles/_formular/$vehicleId')({
  component: () => <Outlet />,
  loader: async ({ params }) => {
    const vehicle = await queryClient.ensureQueryData(vehicleIdQuery(params.vehicleId))
    return {
      crumb: {
        title: "Fahrzeug " + vehicle.numberPlate,
      }
    }
  },
})
