import { wateringPlanIdQuery } from '@/api/queries'
import LoadingInfo from '@/components/general/error/LoadingInfo'
import WateringPlanUpdate from '@/components/watering-plan/WateringPlanUpdate'
import useToast from '@/hooks/useToast'
import { WateringPlanForm } from '@/schema/wateringPlanSchema'
import useFormStore, { FormStore } from '@/store/form/useFormStore'
import useStore from '@/store/store'
import { WateringPlan } from '@green-ecolution/backend-client'
import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Suspense, useCallback } from 'react'
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
  const navigate = useNavigate({ from: Route.fullPath })
  const showToast = useToast()
  const queryClient = useQueryClient()

  const formStore = useFormStore((state: FormStore<WateringPlanForm>) => ({
    form: state.form,
    reset: state.reset,
  }))

  const onUpdateSuccess = useCallback(
    (data: WateringPlan) => {
      formStore.reset()
      navigate({
        to: `/watering-plans/${data.id}`,
        search: { resetStore: false },
        replace: true,
      })
      showToast('Der Einsatzplan wurde erfolgreich editiert.')
      queryClient.invalidateQueries(wateringPlanIdQuery(wateringPlanId))
    },
    [formStore, navigate, showToast, queryClient, wateringPlanId]
  )

  const onUpdateError = () => {
    console.error('Error updating treecluster')
  }

  return (
    <div className="container mt-6">
      <Suspense fallback={<LoadingInfo label="Einsatzplan wird geladen …" />}>
        <ErrorBoundary
          fallback={
            <p className="text-red text-lg font-semibold">
              Eine Bewässerungsgruppe mit der Nummer {wateringPlanId} gibt es
              nicht oder die Daten zur Bewässerungsgruppe konnten nicht geladen
              werden.
            </p>
          }
        >
          <WateringPlanUpdate
            wateringPlanId={wateringPlanId}
            onUpdateSuccess={onUpdateSuccess}
            onUpdateError={onUpdateError}
          />
        </ErrorBoundary>
      </Suspense>
    </div>
  )
}
