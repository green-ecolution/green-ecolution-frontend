import L from "leaflet"
import { useEffect, useRef } from "react"
import { useMap } from "react-leaflet"

type WithLocation = {
  id: string | number,
  latitude: number,
  longitude: number,
}

interface MarkerListProps<T extends WithLocation> {
  data: T[]
  onClick?: (data: T) => void
  icon: (data: T) => L.DivIcon
  tooltipContent?: ((data: T, layer: L.Layer) => L.Content) | L.Tooltip | L.Content
  tooltipOptions?: L.TooltipOptions
}

const MarkerList = <T extends WithLocation>({ data, onClick, icon, tooltipContent, tooltipOptions }: MarkerListProps<T>) => {
  const map = useMap()
  const markersRef = useRef<L.Marker<any>[]>([])

  useEffect(() => {
    if (map) {
      renderMarkers()
      map.on('moveend', renderMarkers)
    }

    return () => {
      if (map) {
        map.off('moveend', renderMarkers)
        markersRef.current.forEach((m) => map.removeLayer(m))
      }
    }
  }, [map])

  const renderMarkers = () => {
    if (!map) return;

    const bounds = map.getBounds();

    markersRef.current.forEach((m) => map.removeLayer(m))
    markersRef.current = [];

    data.filter((t) => bounds.contains([t.latitude, t.longitude])).forEach((t) => {
      const marker = L.marker([t.latitude, t.longitude], { icon: icon(t) })
      if (tooltipContent) {
        typeof tooltipContent === 'function' ? marker.bindTooltip((m) => tooltipContent(t, m), tooltipOptions)
          : marker.bindTooltip(tooltipContent, tooltipOptions)
      }

      marker.addTo(map)
      markersRef.current.push(marker)

      marker.on('click', () => onClick?.(t))
    })
  }

  return null
}

export default MarkerList
