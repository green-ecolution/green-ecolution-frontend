import { Marker, Tooltip } from 'react-leaflet'
import { WateringStatus, TreeCluster } from '@green-ecolution/backend-client'
import { ClusterIcon } from '../MapMarker'
import { getWateringStatusDetails } from '@/hooks/useDetailsForWateringStatus'

export interface ClusterMarkerProps {
  cluster: TreeCluster
  onClick?: (tree: TreeCluster) => void
  highlightedClusters?: number[]
}

const ClusterMarker = ({
  cluster,
  onClick,
  highlightedClusters,
}: ClusterMarkerProps) => {
  const getStatusColor = (wateringStatus: WateringStatus) => {
    const statusDetails = getWateringStatusDetails(
      wateringStatus ?? WateringStatus.WateringStatusUnknown
    )
    return statusDetails.colorHex
  }

  const isHighlighted = (clusterId: number) => {
    return highlightedClusters ? highlightedClusters.includes(clusterId) : false
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
    >
      {cluster.name && (
        <Tooltip
          direction="top"
          offset={[5, -40]}
          className="font-nunito-sans font-semibold"
        >
          {cluster.name}
        </Tooltip>
      )}
    </Marker>
  )
}

export default ClusterMarker
