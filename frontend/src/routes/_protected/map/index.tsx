import {
  createFileRoute,
  useLoaderData,
  useNavigate,
} from '@tanstack/react-router'
import MapButtons from '@/components/map/MapButtons'
import { Tree, TreeCluster } from '@green-ecolution/backend-client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { WithTreesAndClusters } from '@/components/map/TreeMarker'
import { treeClusterQuery, treeQuery } from '@/api/queries'
import { useEffect, useRef, useState } from 'react'
import Dialog from '@/components/general/filter/Dialog'
import { useMapMouseSelect } from '@/hooks/useMapMouseSelect'
import { useMap } from 'react-leaflet'
import StatusFieldset from '@/components/general/filter/fieldsets/StatusFieldset'
import { getWateringStatusDetails } from '@/hooks/useDetailsForWateringStatus'
import useFilter from '@/hooks/useFilter'
import FilterProvider from '@/context/FilterContext'
import { z } from 'zod'

const mapFilterSchema = z.object({
  status: z.array(z.string()).optional().default([]),
})

function MapView() {
  const search = useLoaderData({ from: '/_protected/map/' })
  const navigate = useNavigate({ from: '/map' })
  const map = useMap()
  const dialogRef = useRef<HTMLDivElement>(null)
  const [filteredData, setFilteredData] = useState<Tree[]>([])
  const [activeFilter, setActiveFilter] = useState(true)
  const { data: cluster } = useSuspenseQuery(treeClusterQuery())
  const { data: trees } = useSuspenseQuery(treeQuery())
  const { filters } = useFilter()

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

  const handleFilter = () => {
    const data = trees.data.filter((tree) => {
      const statusFilter =
        filters.statusTags.length === 0 ||
        filters.statusTags.includes(
          getWateringStatusDetails(tree.wateringStatus).label
        )

      return statusFilter
    })

    setActiveFilter(true)
    setFilteredData(data)
  }

  const handleReset = () => {
    setActiveFilter(false)
    setFilteredData(trees.data)
  }

  useEffect(() => {
    if (search.status) {
      setActiveFilter(true);
      handleFilter();
    }
  }, []);

  return (
    <>
      <div className="absolute top-6 left-4">
        <Dialog
          headline="Bäume filtern"
          isOnMap
          fullUrlPath={Route.fullPath}
          onApplyFilters={handleFilter}
          onResetFilters={handleReset}
        >
          <StatusFieldset />
        </Dialog>
      </div>
      <MapButtons />
      <WithTreesAndClusters
        clusters={cluster.data}
        trees={filteredData}
        activeFilter={activeFilter}
        onClickTree={handleTreeClick}
        onClickCluster={handleClusterClick}
      />
    </>
  )
}

const MapViewWithProvider = () => {
  const search = useLoaderData({ from: '/_protected/map/' })
  return (
    <FilterProvider initialStatus={search.status ?? []} initialRegions={[]}>
      <MapView />
    </FilterProvider>
  )
}

export const Route = createFileRoute('/_protected/map/')({
  component: MapViewWithProvider,
  validateSearch: mapFilterSchema,

  loaderDeps: ({ search: { status } }) => ({
    status: status || [],
  }),

  loader: ({ deps: { status } }) => {
    return { status }
  },
})
