import { wateringPlanIdQuery } from '@/api/queries'
import queryClient from '@/api/queryClient'
import LoadingInfo from '@/components/general/error/LoadingInfo'
import WateringPlanDashboard from '@/components/watering-plan/WateringPlanDashboard'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

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

  return (
    <div className="container mt-6">
      <Suspense fallback={<LoadingInfo label="Einsatzplan wird geladen …" />}>
        <WateringPlanDashboard wateringPlanId={wateringPlanId} />
      </Suspense>
    </div>
  )
}

export default WateringPlanDashboard
