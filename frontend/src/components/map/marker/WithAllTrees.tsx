import { Tree, WateringStatus } from '@green-ecolution/backend-client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { treeQuery } from '@/api/queries'
import L from 'leaflet'
import { TreeMarkerIcon } from '../MapMarker'
import { getWateringStatusDetails } from '@/hooks/details/useDetailsForWateringStatus'
import { useMap } from 'react-leaflet'
import { useEffect, useRef } from 'react'

export interface WithAllTreesProps {
  onClick?: (tree: Tree) => void
  selectedTrees?: number[]
  hasHighlightedTree?: number
}

const getStatusColor = (wateringStatus: WateringStatus) => {
  const statusDetails = getWateringStatusDetails(
    wateringStatus ?? WateringStatus.WateringStatusUnknown
  )
  return statusDetails.colorHex
}

const WithAllTrees = ({
  onClick,
  selectedTrees = [],
  hasHighlightedTree,
}: WithAllTreesProps) => {
  const { data } = useSuspenseQuery(treeQuery())
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

  const isSelected = (treeId: number) => {
    return selectedTrees?.includes(treeId) ?? false
  }

  const isHighlighted = (treeId: number) => {
    return hasHighlightedTree === treeId
  }

  const renderMarkers = () => {
    if (!map) return;

    const bounds = map.getBounds();

    markersRef.current.forEach((m) => map.removeLayer(m))
    markersRef.current = [];

    data.data.filter((t: Tree) => bounds.contains([t.latitude, t.longitude])).forEach((t: Tree) => {
      const icon = TreeMarkerIcon(
        getStatusColor(t.wateringStatus),
        isSelected(t.id),
        isHighlighted(t.id)
      )
      const marker = L.marker([t.latitude, t.longitude], { icon })
      marker.addTo(map)
      markersRef.current.push(marker)

      marker.on('click', () => onClick?.(t))
    })
  }

  return null
}

export default WithAllTrees
