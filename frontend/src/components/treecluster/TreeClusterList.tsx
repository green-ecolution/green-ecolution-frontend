import TreeclusterCard from '../general/cards/TreeclusterCard'
import { TreeCluster } from '@/api/backendApi'

interface TreeClusterListProps {
  filteredData: TreeCluster[];
}

const TreeClusterList = ({ filteredData }: TreeClusterListProps) => {
  return (
    <ul>
      {filteredData?.length === 0 ? (
        <li className="text-center text-dark-600 mt-10">
          <p>
            Es wurden keine Bewässerungsgruppen gefunden, die den
            Filterkriterien entsprechen.
          </p>
        </li>
      ) : (
        filteredData?.map((cluster, key) => (
          <li key={key} className="mb-5 last:mb-0">
            <TreeclusterCard treecluster={cluster} />
          </li>
        ))
      )}
    </ul>
  )
}

export default TreeClusterList
