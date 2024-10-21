import { Tree } from '@green-ecolution/backend-client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { treeQuery } from '@/api/queries'
import TreeMarker from './TreeMarker'

export interface WithAllTreesProps {
  onClick?: (tree: Tree) => void
  selectedTrees?: number[]
  hasHighlightedTree?: number
}

const WithAllTrees = ({
  onClick,
  selectedTrees = [],
  hasHighlightedTree,
}: WithAllTreesProps) => {
  const { data } = useSuspenseQuery(treeQuery())

  return data.data.map((tree) => (
    <TreeMarker
      tree={tree}
      key={tree.id}
      onClick={onClick}
      hasHighlightedTree={hasHighlightedTree}
      selectedTrees={selectedTrees}
    />
  ))
}

export default WithAllTrees
