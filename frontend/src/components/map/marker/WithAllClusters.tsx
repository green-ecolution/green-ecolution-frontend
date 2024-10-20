import { TreeCluster } from '@green-ecolution/backend-client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { treeClusterQuery } from '@/api/queries'
import ClusterMarker from './ClusterMarker'

export interface WithAllClustersProps {
  onClick?: (tree: TreeCluster) => void
  hasHighlightedCluster?: number
}

const WithAllClusters = ({
  onClick,
  hasHighlightedCluster,
}: WithAllClustersProps) => {
  const { data } = useSuspenseQuery(treeClusterQuery())

  return data.data
    .filter((cluster) => cluster.region !== undefined)
    .map((cluster) => (
      <ClusterMarker
        cluster={cluster}
        key={cluster.id}
        onClick={onClick}
        hasHighlightedCluster={hasHighlightedCluster}
      />
    ))
}

export default WithAllClusters
