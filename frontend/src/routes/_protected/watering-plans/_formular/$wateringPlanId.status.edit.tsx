import LoadingInfo from '@/components/general/error/LoadingInfo'
import WateringPlanStatusUpdate from '@/components/watering-plan/WateringPlanStatusUpdate'
import useFormStore from '@/store/form/useFormStore'
import useStore from '@/store/store'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export const Route = createFileRoute('/_protected/watering-plans/_formular/$wateringPlanId/status/edit')({
  component: StatusEditWateringPlan,
  beforeLoad: () => {
    useFormStore.getState().setType('edit')
  },
  loader: async () => {
    if (!useStore.getState().auth.isAuthenticated) return
  },
  meta: () => [{title: 'Status des Einsatzplans ändern'}],
})


function StatusEditWateringPlan() {
  const wateringPlanId = Route.useParams().wateringPlanId

  return (
    <div className="container mt-6">
      <Suspense
        fallback={<LoadingInfo label="Einsatzplan wird geladen …" />}
      >
        <ErrorBoundary
          fallback={
            <p className="text-red text-lg font-semibold">
              Eine Bewässerungsgruppe mit der Nummer {wateringPlanId} gibt es nicht
              oder die Daten zur Bewässerungsgruppe konnten nicht geladen
              werden.
            </p>
          }
        >
          <WateringPlanStatusUpdate wateringPlanId={wateringPlanId} />
        </ErrorBoundary>
      </Suspense>
    </div>
  )
}
