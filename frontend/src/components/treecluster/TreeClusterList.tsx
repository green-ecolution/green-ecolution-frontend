import { treeClusterQuery } from '@/api/queries'
import { getWateringStatusDetails } from '@/hooks/useDetailsForWateringStatus'
import { useSuspenseQuery } from '@tanstack/react-query'
import TreeclusterCard from '../general/cards/TreeclusterCard'

interface TreeClusterListProps {
  filter: {
    status: string[]
    region: string[]
  }
}

const TreeClusterList = ({ filter }: TreeClusterListProps) => {
  const { data: clustersRes } = useSuspenseQuery(treeClusterQuery())

  const filteredClusters = clustersRes?.data.filter(
    (cluster) =>
      (filter.status.length === 0 ||
        filter.status.includes(
          getWateringStatusDetails(cluster.wateringStatus).label
        )) &&
      (filter.region.length === 0 ||
        filter.region.includes(cluster.region?.name || ''))
  )

  return (
    <ul>
      {filteredClusters?.length === 0 ? (
        <li className="text-center text-dark-600 mt-10">
          <p>
            Es wurden keine Bewässerungsgruppen gefunden, die den
            Filterkriterien entsprechen.
          </p>
        </li>
      ) : (
        filteredClusters?.map((cluster, key) => (
          <li key={key} className="mb-5 last:mb-0">
            <TreeclusterCard treecluster={cluster} />
          </li>
        ))
      )}
    </ul>
  )
}

export default TreeClusterList
