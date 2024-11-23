import { useMap } from 'react-leaflet'
import { useEffect } from 'react'

function useMapInteractions() {
  const map = useMap()

  const enableDragging = () => {
    map.dragging.enable()
    map.scrollWheelZoom.enable()
    map.doubleClickZoom.enable()
  }

  const disableDragging = () => {
    map.dragging.disable()
    map.scrollWheelZoom.disable()
    map.doubleClickZoom.disable()
  }

  useEffect(() => {
    const handleDoubleClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).id === "filter-button") {
        console.log("bin drin")
        map.doubleClickZoom.disable()
        setTimeout(() => map.doubleClickZoom.enable(), 200)
      }
    }

    const mapContainer = map.getContainer()
    mapContainer.addEventListener('click', handleDoubleClick)

    return () => {
      mapContainer.removeEventListener('click', handleDoubleClick)
    }
  }, [map])

  return { enableDragging, disableDragging }
}

export default useMapInteractions
