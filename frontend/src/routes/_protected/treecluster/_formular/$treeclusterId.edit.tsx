
import LoadingInfo from '@/components/general/error/LoadingInfo'
import TreeClusterUpdate from '@/components/treecluster/TreeClusterUpdate'
import useFormStore from '@/store/form/useFormStore'
import useStore from '@/store/store'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export const Route = createFileRoute(
  '/_protected/treecluster/_formular/$treeclusterId/edit'
)({
  component: EditTreeCluster,
  beforeLoad: () => {
    useFormStore.getState().setType('edit')
  },
  loader: async () => {
    if (!useStore.getState().auth.isAuthenticated) return
  },
  meta: () => [{title: 'Bewässerungsgruppe editieren'}],
})

function EditTreeCluster() {
  const clusterId = Route.useParams().treeclusterId

  return (
    <div className="container mt-6">
      <Suspense
        fallback={<LoadingInfo label="Bewässerungsgruppe wird geladen …" />}
      >
        <ErrorBoundary
          fallback={
            <p className="text-red text-lg font-semibold">
              Eine Bewässerungsgruppe mit der Nummer {clusterId} gibt es nicht
              oder die Daten zur Bewässerungsgruppe konnten nicht geladen
              werden.
            </p>
          }
        >
          <TreeClusterUpdate clusterId={clusterId} />
        </ErrorBoundary>
      </Suspense>
    </div>
  )
}
