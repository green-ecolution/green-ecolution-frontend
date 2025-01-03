import { wateringPlanIdQuery } from '@/api/queries'
import queryClient from '@/api/queryClient'
import LoadingInfo from '@/components/general/error/LoadingInfo'
import WateringPlanDashboard from '@/components/watering-plan/WateringPlanDashboard'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export const Route = createFileRoute('/_protected/watering-plans/$wateringPlanId/')({
  component: SingleWateringPlan,
  loader: async ({ params }) => {
    return {
      wateringPlan: await queryClient.ensureQueryData(
        wateringPlanIdQuery(params.wateringPlanId)
      ),
    }
  },
})

function SingleWateringPlan() {
  const wateringPlanId = Route.useParams().wateringPlanId
  const { wateringPlan } = Route.useLoaderData();

  return (
    <div className="container mt-6">
      <Suspense fallback={<LoadingInfo label="Einsatzplan wird geladen …" />}>
        <ErrorBoundary
          fallback={
            <p className="text-red text-lg font-semibold">
              Einen Einsatzplan mit der Identifikationsnummer {wateringPlanId}&nbsp;
              gibt es nicht oder die Daten konnten nicht geladen werden
            </p>
          }
        >
          <WateringPlanDashboard wateringPlan={wateringPlan} />
        </ErrorBoundary>
      </Suspense>
    </div>
  )
}
 
export default WateringPlanDashboard
