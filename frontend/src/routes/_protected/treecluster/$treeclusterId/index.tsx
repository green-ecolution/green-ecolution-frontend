import { treeClusterIdQuery } from '@/api/queries'
import queryClient from '@/api/queryClient'
import LoadingInfo from '@/components/general/error/LoadingInfo'
import TreeClusterDashboard from '@/components/treecluster/TreeClusterDashboard'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export const Route = createFileRoute('/_protected/treecluster/$treeclusterId/')({
  component: SingleTreecluster,
  loader: async ({ params }) => {
    return {
      cluster: await queryClient.ensureQueryData(
        treeClusterIdQuery(params.treeclusterId)
      ),
    }
  },
})

function SingleTreecluster() {
  const clusterId = Route.useParams().treeclusterId
  return (
    <div className="container mt-6">
      <Suspense
        fallback={<LoadingInfo label="Bewässerungsgruppe wird geladen …" />}
      >
        <ErrorBoundary
          fallback={
            <p className="text-red text-lg">
              Eine Bewässerungsgruppe mit der Identifikationsnummer {clusterId}{' '}
              gibt es nicht oder die Bewässerungsgruppendaten konnten nicht
              geladen werden
            </p>
          }
        >
          <TreeClusterDashboard clusterId={clusterId} />
        </ErrorBoundary>
      </Suspense>
    </div>
  )
}

export default SingleTreecluster
