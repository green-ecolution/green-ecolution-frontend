import { Marker, Tooltip } from 'react-leaflet'
import {
    EntitiesWateringStatus,
  Tree,
} from '@green-ecolution/backend-client'
import { TreeMarkerIcon } from '../MapMarker'
import { getWateringStatusDetails } from '@/hooks/useDetailsForWateringStatus'

interface TreeMarkerProps {
  tree: Tree
  onClick?: (tree: Tree) => void
  hasHighlightedTree?: number
  selectedTrees?: number[]
}

const TreeMarker = ({tree, onClick, hasHighlightedTree, selectedTrees}: TreeMarkerProps) => {
  const getStatusColor = (wateringStatus: EntitiesWateringStatus) => {
    const statusDetails = getWateringStatusDetails(
      wateringStatus ?? EntitiesWateringStatus.WateringStatusUnknown
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
  )
}

export default TreeMarker
