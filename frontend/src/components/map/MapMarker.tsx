import L, { DivIcon, Icon, IconOptions } from "leaflet";
import { Marker } from "react-leaflet";
import { Marker as LeafletMarker } from "leaflet";
import { useMemo, useRef } from "react";

export interface MapMarkerProps {
  icon: Icon<IconOptions> | DivIcon | undefined;
  position: [number, number];
  onClick: () => void;
}

const MapMarker = ({ position, icon, onClick }: MapMarkerProps) => {
  return (
    <Marker
      position={position}
      icon={icon}
      eventHandlers={{
        click: () => onClick(),
      }}
    ></Marker>
  );
};

const markerHtmlStyles = (color: string) => `
  background-color: ${color};
  width: 2rem;
  height: 2rem;
  display: block;
  left: -1rem;
  top: -1rem;
  position: relative;
  border-radius: 3rem 3rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF
`;

export const TreeIcon = (color: string) =>
  L.divIcon({
    iconAnchor: [0, 24],
    popupAnchor: [0, -36],
    html: `<span style="${markerHtmlStyles(color)}" />`,
  });

interface DragableMarkerProps {
  position: L.LatLng;
  onMove?: (latlng: L.LatLng) => void;
  onDrag?: (latlng: L.LatLng) => void;
}

export const DragableMarker = ({
  position,
  onDrag,
  onMove,
}: DragableMarkerProps) => {
  const markerRef = useRef<LeafletMarker>(null);
  const eventHandlers = useMemo(
    () => ({
      move() {
        const marker = markerRef.current;
        if (marker != null) {
          onMove?.(marker.getLatLng());
        }
      },
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          onDrag?.(marker.getLatLng());
        }
      },
    }),
    [],
  );

  return (
    <Marker
      eventHandlers={eventHandlers}
      ref={markerRef}
      draggable
      position={position}
    />
  );
};

export default MapMarker;
