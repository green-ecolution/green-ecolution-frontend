import { treeClusterIdQuery } from '@/api/queries'
import queryClient from '@/api/queryClient'
import LoadingInfo from '@/components/general/error/LoadingInfo'
import TreeClusterDashboard from '@/components/treecluster/TreeClusterDashboard'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

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
        <TreeClusterDashboard treeclusterId={clusterId} />
      </Suspense>
    </div>
  )
}

export default SingleTreecluster
