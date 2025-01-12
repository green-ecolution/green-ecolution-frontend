import LoadingInfo from '@/components/general/error/LoadingInfo'
import WateringPlanUpdate from '@/components/watering-plan/WateringPlanUpdate'
import useFormStore from '@/store/form/useFormStore'
import useStore from '@/store/store'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export const Route = createFileRoute(
  '/_protected/watering-plans/_formular/$wateringPlanId/edit'
)({
  component: StatusEditWateringPlan,
  beforeLoad: () => {
    useFormStore.getState().setType('edit')
  },
  loader: async () => {
    if (!useStore.getState().auth.isAuthenticated) return
  },
  meta: () => [{ title: 'Einsatzplan editieren' }],
})

function StatusEditWateringPlan() {
  const wateringPlanId = Route.useParams().wateringPlanId

  return (
    <div className="container mt-6">
      <Suspense fallback={<LoadingInfo label="Einsatzplan wird geladen …" />}>
        <ErrorBoundary
          fallback={
            <p className="text-red text-lg font-semibold">
              Einen Einsatzplan mit der Nummer {wateringPlanId} gibt es
              nicht oder die Daten zur Bewässerungsgruppe konnten nicht geladen
              werden.
            </p>
          }
        >
          <WateringPlanUpdate wateringPlanId={wateringPlanId} />
        </ErrorBoundary>
      </Suspense>
    </div>
  )
}
