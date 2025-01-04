import useMapStore from '@/store/store'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { z } from 'zod'
import Map from '@/components/map/Map'
import MapConroller from '@/components/map/MapController'
import ZoomControls from '@/components/map/ZoomControls'
import queryClient from '@/api/queryClient'
import { Suspense } from 'react'
import { treeClusterQuery, treeQuery } from '@/api/queries'
import LoadingInfo from '@/components/general/error/LoadingInfo'

const mapSearchParamsSchema = z.object({
  selected: z.string().optional(),
  lat: z.number().catch(useMapStore.getState().map.center[0]),
  lng: z.number().catch(useMapStore.getState().map.center[1]),
  clusterId: z.number().optional(),
  sensorId: z.string().optional(),
  treeId: z.number().optional(),
  wateringPlanId: z.number().optional(),
  zoom: z
    .number()
    .int()
    .max(useMapStore.getState().map.maxZoom)
    .min(useMapStore.getState().map.minZoom)
    .catch(useMapStore.getState().map.minZoom),
})

export const Route = createFileRoute('/_protected/map')({
  component: MapRoot,
  validateSearch: mapSearchParamsSchema,
  loaderDeps: ({ search: { lat, lng, zoom } }) => ({
    lat,
    lng,
    zoom,
  }),
  loader: ({ deps: { lat, lng, zoom } }) => {
    useMapStore.setState((state) => ({
      map: { ...state.map, center: [lat, lng], zoom },
    }))
    return {
      cluster: queryClient.ensureQueryData(treeClusterQuery()),
      tree: queryClient.ensureQueryData(treeQuery()),
    }
  },
  meta: () => [{ title: 'Karte' }],
})

function MapRoot() {
  return (
    <div className="relative">
      <Map>
        <MapConroller path={Route.fullPath} />
        <ZoomControls />
        <Suspense fallback={<LoadingInfo label='Lade Karte...' />}>
          <Outlet />
        </Suspense>
      </Map>
    </div>
  )
}
