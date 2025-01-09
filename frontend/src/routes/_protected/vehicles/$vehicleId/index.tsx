import { vehicleIdQuery } from '@/api/queries'
import queryClient from '@/api/queryClient'
import LoadingInfo from '@/components/general/error/LoadingInfo'
import VehicleDashboard from '@/components/vehicle/VehicleDashboard'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

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
  const { vehicle } = Route.useLoaderData()

  return (
    <div className="container mt-6">
      <Suspense fallback={<LoadingInfo label="Fahrzeug wird geladen …" />}>
        <ErrorBoundary
          fallback={
            <p className="text-red text-lg font-semibold">
              Ein Fahrzeug mit der Identifikationsnummer {vehicleId}&nbsp; gibt
              es nicht oder die Fahrzeugdaten konnten nicht geladen werden
            </p>
          }
        >
          <VehicleDashboard vehicle={vehicle} />
        </ErrorBoundary>
      </Suspense>
    </div>
  )
}

export default SingleVehicle
