import { Marker, Tooltip } from 'react-leaflet'
import {
  EntitiesWateringStatus,
  Tree,
  TreeCluster,
} from '@green-ecolution/backend-client'
import { ClusterIcon, TreeMarkerIcon } from './MapMarker'
import { getWateringStatusDetails } from '@/hooks/useDetailsForWateringStatus'
import useStore from '@/store/store'
import { useSuspenseQuery } from '@tanstack/react-query'
import { treeClusterQuery, treeQuery } from '@/api/queries'

interface WithAllTreesProps {
  onClick?: (tree: Tree) => void
  selectedTrees?: number[]
  hasHighlightedTree?: number
}

export const WithAllTrees = ({
  onClick,
  selectedTrees = [],
  hasHighlightedTree,
}: WithAllTreesProps) => {
  const { data } = useSuspenseQuery(treeQuery())
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

  return data.data.map((tree) => (
    <Marker
      icon={TreeMarkerIcon(
        getStatusColor(tree.wateringStatus),
        isSelected(tree.id),
        isHighlighted(tree.id)
      )}
      key={tree.id}
      position={[tree.latitude, tree.longitude]}
      eventHandlers={{
        click: () => onClick?.(tree),
      }}
    >
      {tree.treeNumber && (
        <Tooltip
          direction="top"
          offset={[5, -40]}
          className="font-nunito-sans font-semibold"
        >
          {tree.treeNumber}
        </Tooltip>
      )}
    </Marker>
  ))
}

interface WithAllClustersProps {
  onClick?: (tree: TreeCluster) => void
  hasHighlightedCluster?: number
}

export const WithAllClusters = ({
  onClick,
  hasHighlightedCluster,
}: WithAllClustersProps) => {
  const { data } = useSuspenseQuery(treeClusterQuery())
  const getStatusColor = (wateringStatus: EntitiesWateringStatus) => {
    const statusDetails = getWateringStatusDetails(
      wateringStatus ?? EntitiesWateringStatus.WateringStatusUnknown
    )
    return statusDetails.colorHex
  }

  const isHighlighted = (clusterId: number) => {
    return hasHighlightedCluster === clusterId
  }

  return data.data
    .filter((cluster) => cluster.region !== undefined)
    .map((cluster) => (
      <Marker
        icon={ClusterIcon(
          getStatusColor(cluster.wateringStatus),
          isHighlighted(cluster.id),
          cluster.trees?.length ?? 0
        )}
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
  zoomThreshold?: number
  activeFilter?: boolean
  hasHighlightedTree?: number
  hasHighlightedCluster?: number
}

export const WithTreesAndClusters = ({
  onClickTree,
  onClickCluster,
  selectedTrees = [],
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
      {zoom >= zoomThreshold || activeFilter ? (
        <WithAllTrees
          onClick={onClickTree}
          selectedTrees={selectedTrees}
          hasHighlightedTree={hasHighlightedTree}
        />
      ) : (
        <WithAllClusters
          onClick={onClickCluster}
          hasHighlightedCluster={hasHighlightedCluster}
        />
      )}
    </>
  )
}
