import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L, { Map as LMap } from "leaflet";
import { useTrees } from "@/context/TreeDataContext";
import { useFakeTrees } from "@/context/FakeTreeDataContext";
import {
  useDisplayFakeTrees,
  useOpenTooltip,
  useSetTooltipContent,
} from "@/store/mapStore";
import { Tree } from "@green-ecolution/backend-client";
import { ForwardedRef, forwardRef, useRef } from "react";

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

export interface MapProps extends MapCallbackProps{
  center: [number, number];
  zoom: number;
  width?: string;
  height?: string;
}

const Map = forwardRef(
  (
    {
      width = "100%",
      height = "100vh",
      center,
      zoom,
      onMapMove,
      onMapZoom,
      onMapClick,
      onMapMoveEnd,
    }: MapProps,
    _: ForwardedRef<LMap>,
  ) => {
    const displayFakeTrees = useDisplayFakeTrees();
    const setTooltipContent = useSetTooltipContent();
    const openTooltip = useOpenTooltip();
    const trees = useTrees();
    const fakeTrees = useFakeTrees();
    const mapRef = useRef<LMap>(null);

    const handleTreeMarkerClick = (tree: Tree) => {
      setTooltipContent(tree);
      openTooltip();
    };

    const treeMarkers = trees.map((tree) => (
      <Marker
        key={tree.id}
        position={[tree.location.latitude, tree.location.longitude]}
        icon={TreeIcon("green")}
        eventHandlers={{
          click: () => handleTreeMarkerClick(tree),
        }}
      ></Marker>
    ));

    const fakeTreeMarkers = fakeTrees.map((tree) => (
      <Marker
        key={tree.id}
        position={[tree.lat, tree.lng]}
        icon={TreeIcon(
          tree.status === "healthy"
            ? "green"
            : tree.status === "neutral"
              ? "yellow"
              : "red",
        )}
      ></Marker>
    ));

    return (
      <MapContainer
        className="z-0"
        zoomControl={false}
        style={{ width, height }}
        center={center}
        zoom={zoom}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {treeMarkers}
        {displayFakeTrees && fakeTreeMarkers}
        <MapCallback
          onMapClick={onMapClick}
          onMapMove={onMapMove}
          onMapZoom={onMapZoom}
          onMapMoveEnd={onMapMoveEnd}
        />
      </MapContainer>
    );
  },
);

export interface MapCallbackProps {
  onMapClick?: () => void;
  onMapZoom?: (zoom: number) => void;
  onMapMove?: (center: [number, number]) => void;
  onMapMoveEnd?: (center: [number, number]) => void;
}

const MapCallback = (props: MapCallbackProps) => {
  const map = useMapEvents({
    click: () => props.onMapClick?.(),
    zoom: () => props.onMapZoom?.(map.getZoom()),
    move: () => {
      const center = map.getCenter();
      props.onMapMove?.([center.lat, center.lng]);
    },
    moveend: () => {
      const center = map.getCenter();
      props.onMapMoveEnd?.([center.lat, center.lng]);
    },
  });

  return null;
}

export default Map;
