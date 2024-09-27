// @ts-ignore because this image needs to be imported, but not found for some reason, but works.
import defaultIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import { Marker } from "react-leaflet";
import { useTrees } from "@/hooks/useTrees";
import { Tree } from "@green-ecolution/backend-client";

const defaultIcon = new Icon({
  iconUrl: defaultIconPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface WithAllTreesProps {
  onClick?: (tree: Tree) => void;
}

export const WithAllTrees = ({onClick}: WithAllTreesProps) => {
  const trees = useTrees();
  return trees.map((tree) => (
    <Marker
      icon={defaultIcon}
      key={tree.id}
      position={[tree.latitude, tree.longitude]}
      eventHandlers={{
        click: () => onClick?.(tree),
      }}
    />
  ));
};
