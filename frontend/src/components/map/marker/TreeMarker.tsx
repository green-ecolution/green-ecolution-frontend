import { Marker, Tooltip } from 'react-leaflet'
import {
    WateringStatus,
  Tree,
} from '@green-ecolution/backend-client'
import { TreeMarkerIcon } from '../MapMarker'
import { getWateringStatusDetails } from '@/hooks/details/useDetailsForWateringStatus'

interface TreeMarkerProps {
  tree: Tree
  onClick?: (tree: Tree) => void
  hasHighlightedTree?: number
  selectedTrees?: number[]
}

const TreeMarker = ({tree, onClick, hasHighlightedTree, selectedTrees}: TreeMarkerProps) => {
  const getStatusColor = (wateringStatus: WateringStatus) => {
    const statusDetails = getWateringStatusDetails(
      wateringStatus ?? WateringStatus.WateringStatusUnknown
    )
    return statusDetails.colorHex
  }

  const isSelected = (treeId: number) => {
    return selectedTrees?.includes(treeId) ?? false
  }

  const isHighlighted = (treeId: number) => {
    return hasHighlightedTree === treeId
  }

  return (
    <Marker
      icon={TreeMarkerIcon(
        getStatusColor(tree.wateringStatus),
        isSelected(tree.id),
        isHighlighted(tree.id)
      )}
      position={[tree.latitude, tree.longitude]}
      eventHandlers={{
        click: () => onClick?.(tree),
      }}
    >
      {tree.number && (
        <Tooltip
          direction="top"
          offset={[5, -40]}
          className="font-nunito-sans font-semibold"
        >
          {tree.number}
        </Tooltip>
      )}
    </Marker>
  )
}

export default TreeMarker
