import L, { DivIcon, Icon, IconOptions } from "leaflet";
import { Marker } from "react-leaflet";

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

export default MapMarker;
