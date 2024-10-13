import { createFileRoute, useNavigate } from '@tanstack/react-router'
import MapButtons from '@/components/map/MapButtons'
import { Tree, TreeCluster } from '@green-ecolution/backend-client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { WithTreesAndClusters } from '@/components/map/TreeMarker'
import { useAuthHeader } from '@/hooks/useAuthHeader'
import { treeClusterQuery } from '@/api/queries'
import { useRef, useState } from 'react'
import Dialog from '@/components/general/filter/Dialog'
import { useMapMouseSelect } from '@/hooks/useMapMouseSelect'
import { useMap } from 'react-leaflet'
import FilterProvider from '@/context/FilterContext'
import StatusFieldset from '@/components/general/filter/fieldsets/StatusFieldset'
import RegionFieldset from '@/components/general/filter/fieldsets/RegionFieldset'

export const Route = createFileRoute('/_protected/map/')({
  component: MapView,
})

function MapView() {
  const navigate = useNavigate({ from: '/map' })
  const auth = useAuthHeader()
  const map = useMap()
  const dialogRef = useRef<HTMLDivElement>(null)
  const [filteredData, setFilteredData] = useState<Tree[]>([])
  const { data } = useSuspenseQuery(treeClusterQuery(auth))

  const handleTreeClick = (tree: Tree) => {
    navigate({ to: `/tree/$treeId`, params: { treeId: tree.id.toString() } })
  }

  const handleClusterClick = (cluster: TreeCluster) => {
    navigate({
      to: `/treecluster/$treeclusterId`,
      params: { treeclusterId: cluster.id.toString() },
    })
  }

  useMapMouseSelect((_, e) => {
    const target = e.originalEvent.target as HTMLElement
    if (dialogRef.current?.contains(target)) {
      map.dragging.disable()
      map.scrollWheelZoom.disable()
    } else {
      map.dragging.enable()
      map.scrollWheelZoom.enable()
    }
  })

  const filterData = () => {
    console.log(data.data);
  }

  return (
    <>
      <FilterProvider initialStatus={[]} initialRegions={[]}>
        <div className="absolute top-6 left-4">
          <Dialog
            headline="Bäume filtern"
            fullUrlPath={Route.fullPath}
            onApplyFilters={() => filterData()}
            onResetFilters={() => setFilteredData(data.data)}
          >
            <StatusFieldset />
            <RegionFieldset />
          </Dialog>
        </div>
        <MapButtons />
        <WithTreesAndClusters
          clusters={data.data}
          trees={data.data.flatMap((cluster) => cluster.trees)}
          onClickTree={handleTreeClick}
          onClickCluster={handleClusterClick}
        />
      </FilterProvider>
    </>
  )
}
