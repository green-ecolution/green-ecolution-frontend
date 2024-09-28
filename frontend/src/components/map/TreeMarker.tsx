import { Marker } from "react-leaflet";
import { useTrees } from "@/hooks/useTrees";
import { Tree } from "@green-ecolution/backend-client";
import { TreeIcon } from "./MapMarker";

interface WithAllTreesProps {
  onClick?: (tree: Tree) => void;
}

export const WithAllTrees = ({onClick}: WithAllTreesProps) => {
  const trees = useTrees();
  return trees.map((tree) => (
    <Marker
      icon={TreeIcon("green")}
      key={tree.id}
      position={[tree.latitude, tree.longitude]}
      eventHandlers={{
        click: () => onClick?.(tree),
      }}
    />
  ));
};
