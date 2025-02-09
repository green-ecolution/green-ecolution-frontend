import { MapContainer, TileLayer } from 'react-leaflet'
import React, { useMemo } from 'react'
import useMapStore from '@/store/store'
import { useSuspenseQuery } from '@tanstack/react-query'
import { infoQuery } from '@/api/queries'
import L from 'leaflet'

export interface MapProps extends React.PropsWithChildren {
  width?: string
  height?: string
}

const Map = ({
  width = '100%',
  height = 'calc(100dvh - 4.563rem)',
  children,
}: MapProps) => {
  const {data: appInfo } = useSuspenseQuery(infoQuery())

  const { zoom, maxZoom, minZoom } = useMapStore(
    (state) => ({
      zoom: state.map.zoom,
      maxZoom: state.map.maxZoom,
      minZoom: state.map.minZoom,
    })
  )
  
  const time = useMemo(() => new Date().getTime(), [])

  return (
    <MapContainer
      key={time}
      preferCanvas
      className="z-0"
      zoomControl={false}
      style={{ width, height }}
      center={[appInfo?.map?.center.latitude, appInfo.map.center.longitude]}
      zoom={zoom}
      maxZoom={maxZoom}
      minZoom={minZoom}
      maxBounds={L.latLngBounds(
                [appInfo?.map?.boundsSouthWest.latitude, appInfo.map.boundsSouthWest.longitude],
                [appInfo?.map?.boundsNorthEast.latitude, appInfo.map.boundsNorthEast.longitude]
              )}
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
