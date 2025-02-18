import { TreeCluster } from '@green-ecolution/backend-client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { treeClusterQuery } from '@/api/queries'
import ClusterMarker from './ClusterMarker'

export interface WithAllClustersProps {
  onClick?: (tree: TreeCluster) => void
  highlightedClusters?: number[]
}

const WithAllClusters = ({
  onClick,
  highlightedClusters,
}: WithAllClustersProps) => {
  const { data } = useSuspenseQuery(treeClusterQuery())

  return data.data
    .filter((cluster) => cluster.latitude !== null && cluster.longitude !== null && cluster.treeIds !== undefined)
    .map((cluster) => (
      <ClusterMarker
        cluster={cluster}
        key={cluster.id}
        onClick={onClick}
        highlightedClusters={highlightedClusters}
      />
    ))
}

export default WithAllClusters
