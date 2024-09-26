import MapSelectTreesModal from "@/components/map/MapSelectTreesModal";
import useStore from "@/store/store";
import { createFileRoute } from "@tanstack/react-router";
import { Marker } from "react-leaflet";
// @ts-ignore because this image needs to be imported, but not found for some reason, but works.
import defaultIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import MapButtons from "@/components/map/MapButtons";
import { useTrees } from "@/hooks/useTrees";

const defaultIcon = new Icon({
  iconUrl: defaultIconPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const Route = createFileRoute("/_protected/map/")({
  component: MapView,
});

function MapView() {
  const showSelectModal = useStore((state) => state.map.showSelectModal);
  const trees = useTrees();

  return (
    <>
      {showSelectModal && <MapSelectTreesModal />}
      <MapButtons />

      {trees.map((tree) => (
        <Marker
          icon={defaultIcon}
          key={tree.id}
          position={[tree.latitude, tree.longitude]}
        />
      ))}
    </>
  );
}
