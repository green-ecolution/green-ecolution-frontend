import LoadingInfo from '@/components/general/error/LoadingInfo'
import useFormStore from '@/store/form/useFormStore'
import useStore from '@/store/store'
import { createFileRoute } from '@tanstack/react-router'
import VehicleUpdate from '@/components/vehicle/VehicleUpdate'

export const Route = createFileRoute(
  '/_protected/vehicles/_formular/$vehicleId/edit/'
)({
  component: EditVehicle,
  pendingComponent: () => <LoadingInfo label="Fahrzeug wird geladen …" />,
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
      <VehicleUpdate vehicleId={vehicleId} />
    </div>
  )
}
