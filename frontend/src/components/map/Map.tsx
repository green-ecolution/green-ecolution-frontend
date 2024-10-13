import { MapContainer, TileLayer } from 'react-leaflet'
import React, { useMemo } from 'react'
import useMapStore from '@/store/store'

export interface MapProps extends React.PropsWithChildren {
  width?: string
  height?: string
}

const Map = ({
  width = '100%',
  height = 'calc(100dvh - 4.563rem)',
  children,
}: MapProps) => {
  const { zoom, center, maxZoom, minZoom } = useMapStore((state) => ({
    zoom: state.map.zoom,
    center: state.map.center,
    maxZoom: state.map.maxZoom,
    minZoom: state.map.minZoom,
  }))
  const time = useMemo(() => new Date().getTime(), [])

  return (
    <MapContainer
      key={time}
      className="z-0"
      zoomControl={false}
      style={{ width, height }}
      center={center}
      zoom={zoom}
      maxZoom={maxZoom}
      minZoom={minZoom}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  )
}

export default Map
