import { Tree } from '@green-ecolution/backend-client'
import MarkerList from './MarkerList'
import { getStatusColor, TreeMarkerIcon } from '../MapMarker'

interface WithFilterdTreesProps {
  onClick?: (tree: Tree) => void
  selectedTrees?: number[]
  hasHighlightedTree?: number
  filterdTrees: Tree[]
}

const WithFilterdTrees = ({
  onClick,
  selectedTrees = [],
  hasHighlightedTree,
  filterdTrees,
}: WithFilterdTreesProps) => {
  return <MarkerList
    data={filterdTrees}
    onClick={onClick}
    icon={(t) => TreeMarkerIcon(
      getStatusColor(t.wateringStatus),
      selectedTrees?.includes(t.id) ?? false,
      hasHighlightedTree === t.id
    )}
    tooltipContent={(t) => t.number}
    tooltipOptions={{
      direction: "top",
      offset: [5, -40],
      className: "font-nunito-sans font-semibold",
    }}
  />
}

export default WithFilterdTrees
