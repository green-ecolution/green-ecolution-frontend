import { createFileRoute, useNavigate } from '@tanstack/react-router'
import MapButtons from '@/components/map/MapButtons'
import { Tree, TreeCluster } from '@green-ecolution/backend-client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { WithTreesAndClusters } from '@/components/map/TreeMarker'
import { treeClusterQuery, treeQuery } from '@/api/queries'
import useDocumentTitle from '@/hooks/useDocumentTitle'

export const Route = createFileRoute('/_protected/map/')({
  component: MapView,
})

function MapView() {
  useDocumentTitle("Baumkataster")
  const navigate = useNavigate({ from: '/map' })
  const { data: cluster } = useSuspenseQuery(treeClusterQuery())
  const { data: trees } = useSuspenseQuery(treeQuery())

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
        clusters={cluster.data}
        trees={trees.data}
        onClickTree={handleTreeClick}
        onClickCluster={handleClusterClick}
      />
    </>
  )
}
