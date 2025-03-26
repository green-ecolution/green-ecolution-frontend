import LoadingInfo from '@/components/general/error/LoadingInfo'
import useFormStore from '@/store/form/useFormStore'
import useStore from '@/store/store'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import VehicleUpdate from '@/components/vehicle/VehicleUpdate'

export const Route = createFileRoute(
  '/_protected/vehicles/_formular/$vehicleId/edit/'
)({
  component: EditVehicle,
  beforeLoad: () => {
    useFormStore.getState().setType('edit')
  },
  loader: async () => {
    if (!useStore.getState().auth.isAuthenticated) return
  },
})

function EditVehicle() {
  const vehicleId = Route.useParams().vehicleId

  return (
    <div className="container mt-6">
      <Suspense fallback={<LoadingInfo label="Fahrzeug wird geladen …" />}>
        <VehicleUpdate vehicleId={vehicleId} />
      </Suspense>
    </div>
  )
}
