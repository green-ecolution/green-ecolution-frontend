import { MapContainer, TileLayer } from "react-leaflet";
import React from "react";

export interface MapProps extends React.PropsWithChildren {
  center: [number, number];
  zoom: number;
  width?: string;
  height?: string;
}

const Map = ({
  width = "100%",
  height = "100vh",
  center,
  zoom,
  children,
}: MapProps) => {
  return (
    <MapContainer
      className="z-0"
      zoomControl={false}
      style={{ width, height }}
      center={center}
      zoom={zoom}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
};

export default Map;
