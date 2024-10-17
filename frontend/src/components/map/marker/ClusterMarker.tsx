import { Marker } from 'react-leaflet'
import {
  EntitiesWateringStatus,
  TreeCluster,
} from '@green-ecolution/backend-client'
import { ClusterIcon } from '../MapMarker'
import { getWateringStatusDetails } from '@/hooks/useDetailsForWateringStatus'

export interface ClusterMarkerProps {
  cluster: TreeCluster
  onClick?: (tree: TreeCluster) => void
  hasHighlightedCluster?: number
}

const ClusterMarker = ({
  cluster,
  onClick,
  hasHighlightedCluster,
}: ClusterMarkerProps) => {
  const getStatusColor = (wateringStatus: EntitiesWateringStatus) => {
    const statusDetails = getWateringStatusDetails(
      wateringStatus ?? EntitiesWateringStatus.WateringStatusUnknown
    )
    return statusDetails.colorHex
  }

  const isHighlighted = (clusterId: number) => {
    return hasHighlightedCluster === clusterId
  }
  return (
    <Marker
      icon={ClusterIcon(
        getStatusColor(cluster.wateringStatus),
        isHighlighted(cluster.id),
        cluster.trees?.length ?? 0
      )}
      position={[cluster.latitude, cluster.longitude]}
      eventHandlers={{
        click: () => onClick?.(cluster),
      }}
    />
  )
}

export default ClusterMarker
