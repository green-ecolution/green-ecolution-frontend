import useFormStore from '@/store/form/useFormStore'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import LoadingInfo from '@/components/general/error/LoadingInfo'
import { ErrorBoundary } from 'react-error-boundary'
import TreeUpdate from '@/components/tree/TreeUpdate'

export const Route = createFileRoute('/_protected/trees/_formular/$treeId/edit')(
  {
    component: EditTree,
    beforeLoad: () => {
      useFormStore.getState().setType('edit')
    },
    meta: () => [{ title: `Baum editieren` }],
  }
)

function EditTree() {
  const treeId = Route.useParams().treeId

  return (
    <div className="container mt-6">
      <Suspense fallback={<LoadingInfo label="Baumdaten werden geladen …" />}>
        <ErrorBoundary
          fallback={
            <p className="text-red text-lg font-semibold">
              Einen Baum mit der Identifikationsnummer {treeId} gibt es nicht
              oder die Baumdaten konnten nicht geladen werden.
            </p>
          }
        >
          <TreeUpdate treeId={treeId} />
        </ErrorBoundary>
      </Suspense>
    </div>
  )
}
