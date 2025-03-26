import LoadingInfo from '@/components/general/error/LoadingInfo'
import WateringPlanUpdate from '@/components/watering-plan/WateringPlanUpdate'
import useFormStore from '@/store/form/useFormStore'
import useStore from '@/store/store'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute(
  '/_protected/watering-plans/_formular/$wateringPlanId/edit/'
)({
  component: StatusEditWateringPlan,
  beforeLoad: () => {
    useFormStore.getState().setType('edit')
  },
  loader: async () => {
    if (!useStore.getState().auth.isAuthenticated) return
  },
})

function StatusEditWateringPlan() {
  const wateringPlanId = Route.useParams().wateringPlanId

  return (
    <div className="container mt-6">
      <Suspense fallback={<LoadingInfo label="Einsatzplan wird geladen …" />}>
        <WateringPlanUpdate wateringPlanId={wateringPlanId} />
      </Suspense>
    </div>
  )
}
