import { Marker } from 'react-leaflet'
import {
  EntitiesWateringStatus,
  Tree,
  TreeCluster,
} from '@green-ecolution/backend-client'
import { ClusterIcon, TreeMarkerIcon } from './MapMarker'
import { getWateringStatusDetails } from '@/hooks/useDetailsForWateringStatus'
import useStore from '@/store/store'

interface WithAllTreesProps {
  onClick?: (tree: Tree) => void
  selectedTrees?: number[]
  trees: Tree[]
  hasHighlightedTree?: number
}

export const WithAllTrees = ({
  onClick,
  selectedTrees = [],
  trees,
  hasHighlightedTree,
}: WithAllTreesProps) => {
  const getStatusColor = (wateringStatus: EntitiesWateringStatus) => {
    const statusDetails = getWateringStatusDetails(
      wateringStatus ?? EntitiesWateringStatus.WateringStatusUnknown
    )
    return statusDetails.colorHex
  }

  const isSelected = (treeId: number) => {
    return selectedTrees.includes(treeId)
  }

  const isHighlighted = (treeId: number) => {
    return hasHighlightedTree === treeId
  }

  return trees.map((tree) => (
    <Marker
      icon={TreeMarkerIcon(getStatusColor(tree.wateringStatus), isSelected(tree.id), isHighlighted(tree.id))}
      key={tree.id}
      position={[tree.latitude, tree.longitude]}
      eventHandlers={{
        click: () => onClick?.(tree),
      }}
    />
  ))
}

interface WithAllClustersProps {
  onClick?: (tree: TreeCluster) => void
  clusters: TreeCluster[]
  hasHighlightedCluster?: number,
}

export const WithAllClusters = ({
  onClick,
  clusters,
  hasHighlightedCluster,
}: WithAllClustersProps) => {
  const getStatusColor = (wateringStatus: EntitiesWateringStatus) => {
    const statusDetails = getWateringStatusDetails(
      wateringStatus ?? EntitiesWateringStatus.WateringStatusUnknown
    )
    return statusDetails.colorHex
  }

  const isHighlighted = (clusterId: number) => {
    return hasHighlightedCluster === clusterId
  }

  return clusters.map((cluster) => (
    <Marker
      icon={ClusterIcon(getStatusColor(cluster.wateringStatus), isHighlighted(cluster.id), cluster.trees.length)}
      key={cluster.id}
      position={[cluster.latitude, cluster.longitude]}
      eventHandlers={{
        click: () => onClick?.(cluster),
      }}
    />
  ))
}

interface WithTreesAndClustersProps {
  onClickTree?: (tree: Tree) => void
  onClickCluster?: (cluster: TreeCluster) => void
  selectedTrees?: number[]
  trees: Tree[]
  clusters: TreeCluster[]
  zoomThreshold?: number
  activeFilter?: boolean
  hasHighlightedTree?: number,
  hasHighlightedCluster?: number,
}

export const WithTreesAndClusters = ({
  onClickTree,
  onClickCluster,
  selectedTrees = [],
  trees,
  clusters,
  zoomThreshold = 17,
  activeFilter = false,
  hasHighlightedTree,
  hasHighlightedCluster,
}: WithTreesAndClustersProps) => {
  const { zoom } = useStore((state) => ({
    zoom: state.map.zoom,
  }))

  return (
    <>
      {zoom >= zoomThreshold || activeFilter
        ? <WithAllTrees trees={trees} onClick={onClickTree} selectedTrees={selectedTrees} hasHighlightedTree={hasHighlightedTree} />
        : <WithAllClusters clusters={clusters} onClick={onClickCluster} hasHighlightedCluster={hasHighlightedCluster} />}
         
    </>
  )
}
