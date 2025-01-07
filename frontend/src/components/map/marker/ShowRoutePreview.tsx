import { routePreviewQuery } from "@/api/queries"
import { useSuspenseQuery } from "@tanstack/react-query"
import { GeoJSON } from 'react-leaflet/GeoJSON'
import { BBox } from 'geojson'

export interface ShowRoutePreview {
  transporterId: number
  trailerId?: number
  selectedClustersIds: number[]
}

const ShowRoutePreview = ({ transporterId, trailerId, selectedClustersIds }: ShowRoutePreview) => {
  if (trailerId === -1) {
    trailerId = undefined
  }
  const { data } = useSuspenseQuery(routePreviewQuery(transporterId, selectedClustersIds, trailerId))

  return (<>
    {/* GeoJSON needs a unique key to rerender */}
    <GeoJSON key={selectedClustersIds.join("-") + transporterId + trailerId} data={data as (Omit<typeof data, "bbox"> & { bbox: BBox })} />
  </>)
}

export default ShowRoutePreview
