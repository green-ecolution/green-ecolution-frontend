import { vehicleIdQuery } from '@/api/queries'
import queryClient from '@/api/queryClient'
import LoadingInfo from '@/components/general/error/LoadingInfo'
import VehicleDashboard from '@/components/vehicle/VehicleDashboard'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute('/_protected/vehicles/$vehicleId/')({
  component: SingleVehicle,
  loader: async ({ params }) => {
    return {
      vehicle: await queryClient.ensureQueryData(
        vehicleIdQuery(params.vehicleId)
      ),
    }
  },
})

function SingleVehicle() {
  const vehicleId = Route.useParams().vehicleId

  return (
    <div className="container mt-6">
      <Suspense fallback={<LoadingInfo label="Fahrzeug wird geladen …" />}>
        <VehicleDashboard vehicleId={vehicleId} />
      </Suspense>
    </div>
  )
}

export default SingleVehicle
