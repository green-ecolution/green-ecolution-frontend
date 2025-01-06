import { routePreviewQuery } from "@/api/queries"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { GeoJSON } from 'react-leaflet/GeoJSON'
import { BBox } from 'geojson'

export interface ShowRoutePreview {
  vehicleId: number
  selectedClustersIds: number[]
}

const ShowRoutePreview = ({ vehicleId, selectedClustersIds }: ShowRoutePreview) => {
  const { data } = useSuspenseQuery(routePreviewQuery(vehicleId, selectedClustersIds))

  useEffect(() => {
    console.log(data)
  }, [data])

  return (<>
    {/* GeoJSON needs a unique key to rerender */}
    <GeoJSON key={selectedClustersIds.join("-") + vehicleId} data={data as (Omit<typeof data, "bbox"> & { bbox: BBox })} />
  </>)
}

export default ShowRoutePreview
