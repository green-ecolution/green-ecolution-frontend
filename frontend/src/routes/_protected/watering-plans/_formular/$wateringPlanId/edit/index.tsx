import LoadingInfo from '@/components/general/error/LoadingInfo'
import WateringPlanUpdate from '@/components/watering-plan/WateringPlanUpdate'
import useFormStore from '@/store/form/useFormStore'
import useStore from '@/store/store'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_protected/watering-plans/_formular/$wateringPlanId/edit/'
)({
  component: StatusEditWateringPlan,
  pendingComponent: () => <LoadingInfo label="Einsatzplan wird geladen …" />,
  beforeLoad: () => {
    useFormStore.getState().setType('edit')
  },
  loader: () => {
    if (!useStore.getState().auth.isAuthenticated) return
  },
})

function StatusEditWateringPlan() {
  const wateringPlanId = Route.useParams().wateringPlanId

  return (
    <div className="container mt-6">
      <WateringPlanUpdate wateringPlanId={wateringPlanId} />
    </div>
  )
}
