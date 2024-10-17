import { Tree } from '@green-ecolution/backend-client'
import TreeMarker from './TreeMarker'

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
  return filterdTrees.map((tree) => (
    <TreeMarker
      tree={tree}
      key={tree.id}
      selectedTrees={selectedTrees}
      hasHighlightedTree={hasHighlightedTree}
      onClick={onClick}
    />
  ))
}

export default WithFilterdTrees
