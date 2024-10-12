import { Marker } from "react-leaflet";
import { useTrees } from "@/hooks/useTrees";
import { EntitiesWateringStatus, Tree } from "@green-ecolution/backend-client";
import { TreeIcon } from "./MapMarker";
import { getWateringStatusDetails } from "@/hooks/useDetailsForWateringStatus";

interface WithAllTreesProps {
  onClick?: (tree: Tree) => void;
  selectedTrees?: number[];
}

export const WithAllTrees = ({onClick, selectedTrees = []}: WithAllTreesProps) => {
  const trees = useTrees();

  const getStatusColor = (wateringStatus: EntitiesWateringStatus) => {
    const statusDetails = getWateringStatusDetails(wateringStatus ?? EntitiesWateringStatus.WateringStatusUnknown);
    return statusDetails.colorHex;
  }

  const isSelected = (treeId: number) => {
    return selectedTrees.includes(treeId);
  }

  return trees.map((tree) => (
    <Marker
      icon={TreeIcon(getStatusColor(tree.wateringStatus), isSelected(tree.id))}
      key={tree.id}
      position={[tree.latitude, tree.longitude]}
      eventHandlers={{
        click: () => onClick?.(tree),
      }}
    />
  ));
};
