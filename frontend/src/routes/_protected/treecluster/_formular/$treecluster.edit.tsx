import { TreeCluster } from '@/api/backendApi'
import LoadingInfo from '@/components/general/error/LoadingInfo'
import TreeClusterUpdate from '@/components/treecluster/TreeClusterUpdate'
import useToast from '@/hooks/useToast'
import { TreeclusterSchema } from '@/schema/treeclusterSchema'
import useFormStore, { FormStore } from '@/store/form/useFormStore'
import useStore from '@/store/store'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Suspense, useCallback } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export const Route = createFileRoute(
  '/_protected/treecluster/_formular/$treecluster/edit'
)({
  component: EditTreeCluster,
  beforeLoad: () => {
    useFormStore.getState().setType('edit')
  },
  loader: () => {
    if (!useStore.getState().auth.isAuthenticated) return
  },
})

function EditTreeCluster() {
  const clusterId = Route.useParams().treecluster
  const navigate = useNavigate({ from: Route.fullPath })
  const showToast = useToast()

  const formStore = useFormStore((state: FormStore<TreeclusterSchema>) => ({
    form: state.form,
    reset: state.reset,
  }))

  const onUpdateSuccess = useCallback(
    (data: TreeCluster) => {
      formStore.reset()
      navigate({
        to: `/treecluster/${data.id}`,
        search: { resetStore: false },
        replace: true,
      })
      showToast('Die Bewässerungsgruppe wurde erfolgreich editiert.')
    },
    [formStore, navigate, showToast]
  )

  const onUpdateError = () => {
    console.error('Error updating treecluster')
  }

  return (
    <div className="container mt-6">
      <Suspense
        fallback={<LoadingInfo label="Bewässerungsgruppe wird geladen …" />}
      >
        <ErrorBoundary
          fallback={
            <p className="text-red text-lg">
              Eine Bewässerungsgruppe mit der Nummer {clusterId} gibt es nicht
              oder die Daten zur Bewässerungsgruppe konnten nicht geladen
              werden.
            </p>
          }
        >
          <TreeClusterUpdate
            clusterId={clusterId}
            onUpdateSuccess={onUpdateSuccess}
            onUpdateError={onUpdateError}
          />
        </ErrorBoundary>
      </Suspense>
    </div>
  )
}
