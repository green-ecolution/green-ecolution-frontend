import { Marker } from 'react-leaflet'
import {
  EntitiesWateringStatus,
  Tree,
  TreeCluster,
} from '@green-ecolution/backend-client'
import { ClusterIcon, TreeIcon } from './MapMarker'
import { getWateringStatusDetails } from '@/hooks/useDetailsForWateringStatus'
import useStore from '@/store/store'

interface WithAllTreesProps {
  onClick?: (tree: Tree) => void
  selectedTrees?: number[]
  trees: Tree[]
}

export const WithAllTrees = ({
  onClick,
  selectedTrees = [],
  trees,
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

  return trees.map((tree) => (
    <Marker
      icon={TreeIcon(getStatusColor(tree.wateringStatus), isSelected(tree.id))}
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
  selectedClusters?: number[]
  clusters: TreeCluster[]
}

export const WithAllClusters = ({
  onClick,
  selectedClusters = [],
  clusters
}: WithAllClustersProps) => {
  const getStatusColor = (wateringStatus: EntitiesWateringStatus) => {
    const statusDetails = getWateringStatusDetails(
      wateringStatus ?? EntitiesWateringStatus.WateringStatusUnknown
    )
    return statusDetails.colorHex
  }

  const isSelected = (treeId: number) => {
    return selectedClusters.includes(treeId)
  }

  return clusters.map((cluster) => (
    <Marker
      icon={ClusterIcon(getStatusColor(cluster.wateringStatus), isSelected(cluster.id), cluster.trees.length)}
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
  selectedClusters?: number[]
  trees: Tree[]
  clusters: TreeCluster[]
  zoomThreshold?: number
}

export const WithTreesAndClusters = ({
  onClickTree,
  onClickCluster,
  selectedTrees = [],
  selectedClusters = [],
  trees,
  clusters,
  zoomThreshold = 17,
}: WithTreesAndClustersProps) => {
  const { zoom } = useStore((state) => ({
    zoom: state.map.zoom,
  }))

  return (
    <>
      {zoom >= zoomThreshold
        ? <WithAllTrees trees={trees} onClick={onClickTree} selectedTrees={selectedTrees} />
        : <WithAllClusters clusters={clusters} onClick={onClickCluster} selectedClusters={selectedClusters} />}
         
    </>
  )
}
