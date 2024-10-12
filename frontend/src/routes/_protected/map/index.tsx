import { createFileRoute, useNavigate } from '@tanstack/react-router'
import MapButtons from '@/components/map/MapButtons'
import { Tree, TreeCluster } from '@green-ecolution/backend-client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { WithTreesAndClusters } from '@/components/map/TreeMarker'
import { useAuthHeader } from '@/hooks/useAuthHeader'
import { treeClusterQuery } from '@/api/queries'

export const Route = createFileRoute('/_protected/map/')({
  component: MapView,
})

function MapView() {
  const navigate = useNavigate({ from: '/map' })
  const auth = useAuthHeader()
  const { data } = useSuspenseQuery(treeClusterQuery(auth))

  const handleTreeClick = (tree: Tree) => {
    navigate({ to: `/tree/$treeId`, params: { treeId: tree.id.toString() } })
  }

  const handleClusterClick = (cluster: TreeCluster) => {
    navigate({
      to: `/treecluster/$treeclusterId`,
      params: { treeclusterId: cluster.id.toString() },
    })
  }

  return (
    <>
      <MapButtons />
      <WithTreesAndClusters
        clusters={data.data}
        trees={data.data.flatMap((cluster) => cluster.trees)}
        onClickTree={handleTreeClick}
        onClickCluster={handleClusterClick}
      />
    </>
  )
}
