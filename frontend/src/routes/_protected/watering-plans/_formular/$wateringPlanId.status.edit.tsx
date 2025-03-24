import LoadingInfo from '@/components/general/error/LoadingInfo'
import WateringPlanStatusUpdate from '@/components/watering-plan/WateringPlanStatusUpdate'
import useFormStore from '@/store/form/useFormStore'
import useStore from '@/store/store'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute('/_protected/watering-plans/_formular/$wateringPlanId/status/edit')({
  component: StatusEditWateringPlan,
  beforeLoad: () => {
    useFormStore.getState().setType('edit')
  },
  loader: async () => {
    if (!useStore.getState().auth.isAuthenticated) return
  },
  meta: () => [{ title: 'Status des Einsatzplans ändern' }],
})


function StatusEditWateringPlan() {
  const wateringPlanId = Route.useParams().wateringPlanId

  return (
    <div className="container mt-6">
      <Suspense
        fallback={<LoadingInfo label="Einsatzplan wird geladen …" />}
      >
        <WateringPlanStatusUpdate wateringPlanId={wateringPlanId} />
      </Suspense>
    </div>
  )
}
