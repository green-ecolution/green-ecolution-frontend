  import LoadingInfo from '@/components/general/error/LoadingInfo'
import TreeDashboard from '@/components/tree/TreeDashboard'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export const Route = createFileRoute('/_protected/tree/$treeId')({
  component: SingleTree,
})

function SingleTree() {
  const treeId = Route.useParams().treeId

  return (
    <div className="container mt-6">
      <Suspense fallback={<LoadingInfo label="Baumdaten werden geladen …" />}>
        <ErrorBoundary
          fallback={
            <p className="text-red text-lg">
              Einen Baum mit der Identifikationsnummer {treeId} gibt es nicht
              oder die Baumdaten konnten nicht geladen werden.
            </p>
          }
        >
          <TreeDashboard treeId={treeId} />
        </ErrorBoundary>
      </Suspense>
    </div>
  )
}
