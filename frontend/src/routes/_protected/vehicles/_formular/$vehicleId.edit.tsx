import { vehicleIdQuery } from '@/api/queries'
import { VehicleForm } from '@/schema/vehicleSchema'
import { Vehicle } from '@/api/backendApi'
import LoadingInfo from '@/components/general/error/LoadingInfo'
import useToast from '@/hooks/useToast'
import useFormStore, { FormStore } from '@/store/form/useFormStore'
import useStore from '@/store/store'
import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Suspense, useCallback } from 'react'
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
  const navigate = useNavigate({ from: Route.fullPath })
  const showToast = useToast()
  const queryClient = useQueryClient()

  const formStore = useFormStore((state: FormStore<VehicleForm>) => ({
    form: state.form,
    reset: state.reset,
  }))

  const onUpdateSuccess = useCallback(
    (data: Vehicle) => {
      formStore.reset()
      navigate({
        to: `/vehicles/${data.id}`,
        search: { resetStore: false },
        replace: true,
      })
      showToast('Das Fahrzeug wurde erfolgreich editiert.')
      queryClient.invalidateQueries(vehicleIdQuery(vehicleId))
    },
    [formStore, navigate, showToast, vehicleId, queryClient]
  )

  const onUpdateError = () => {
    console.error('Error updating vehicle')
  }

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
          <VehicleUpdate
            vehicleId={vehicleId}
            onUpdateSuccess={onUpdateSuccess}
            onUpdateError={onUpdateError}
          />
        </ErrorBoundary>
      </Suspense>
    </div>
  )
}
