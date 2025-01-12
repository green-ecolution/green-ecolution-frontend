import LoadingInfo from '@/components/general/error/LoadingInfo'
import useFormStore from '@/store/form/useFormStore'
import useStore from '@/store/store'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import VehicleUpdate from '@/components/vehicle/VehicleUpdate'

export const Route = createFileRoute(
  '/_protected/vehicles/_formular/$vehicleId/edit'
)({
  component: EditVehicle,
  beforeLoad: () => {
    useFormStore.getState().setType('edit')
  },
  loader: async () => {
    if (!useStore.getState().auth.isAuthenticated) return
  },
  meta: () => [{ title: 'Fahrzeug editieren' }],
})

function EditVehicle() {
  const vehicleId = Route.useParams().vehicleId

  return (
    <div className="container mt-6">
      <Suspense fallback={<LoadingInfo label="Fahrzeug wird geladen …" />}>
        <ErrorBoundary
          fallback={
            <p className="text-red text-lg font-semibold">
              Ein Fahrzeug mit der Nummer {vehicleId} gibt es nicht oder die
              Daten des Fahrzeugs konnten nicht geladen werden.
            </p>
          }
        >
          <VehicleUpdate vehicleId={vehicleId} />
        </ErrorBoundary>
      </Suspense>
    </div>
  )
}
