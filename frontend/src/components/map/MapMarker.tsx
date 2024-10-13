// @ts-expect-error because this image needs to be imported, but not found for some reason, but works.
import defaultIconPng from "leaflet/dist/images/marker-icon.png";
import L, { DivIcon, Icon, IconOptions } from "leaflet";
import { Marker } from "react-leaflet";
import { Marker as LeafletMarker } from "leaflet";
import { useMemo, useRef } from "react";
import { Check } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";
import TreeIcon from "../icons/Tree";

const iconToSvg = (IconComponent: React.FC<React.SVGProps<SVGSVGElement>>) => {
  return renderToStaticMarkup(<IconComponent className="text-white w-[1.125rem] h-[1.125rem]" strokeWidth={3} />);
};

const defaultIcon = new Icon({
  iconUrl: defaultIconPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

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
  position: absolute;
  border-radius: 3rem;
  left: 0.25rem;
  top: 0.25rem;
  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const markerClusterHtmlStyles = (color: string) => `
  background-color: ${color};
  width: 2.25rem;
  height: 2.25rem;
  position: absolute;
  border-radius: 3rem;
  left: 0.25rem;
  top: 0.25rem;
  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.875rem;
  color: white;
  font-family: Nunito, sans-serif;
`;

const makerWrapperStyles = (isSelected: boolean) => `
  background-color: ${isSelected ? 'white' : ''};
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 3rem;
  position: relative;
  left: -1rem;
  top: -1rem;
  box-shadow: rgba(0, 0, 0, ${isSelected ? '0.35' : '0'}) 0px 5px 15px;
`;

export const TreeMarkerIcon = (color: string, isSelected: boolean) =>
  L.divIcon({
    iconAnchor: [0, 24],
    popupAnchor: [0, -36],
    html:
      `<figure style="${makerWrapperStyles(isSelected)}">
        <span style="${markerHtmlStyles(color)}">
          ${isSelected ? iconToSvg(Check) : iconToSvg(TreeIcon)}
        </span>
      </figure>`,
  });

export const ClusterIcon = (color: string, isSelected: boolean, includedTrees: number) =>
  L.divIcon({
    iconAnchor: [0, 24],
    popupAnchor: [0, -36],
    html:
      `<figure style="${makerWrapperStyles(isSelected)}">
        <span style="${markerClusterHtmlStyles(color)}">
          ${isSelected ? iconToSvg(Check) : includedTrees}
        </span>
      </figure>`,
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
    [onDrag, onMove],
  );

  return (
    <Marker
      eventHandlers={eventHandlers}
      icon={defaultIcon}
      ref={markerRef}
      draggable
      position={position}
    />
  );
};

export default MapMarker;
