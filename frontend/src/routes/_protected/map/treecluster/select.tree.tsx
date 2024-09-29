import MapSelectTreesModal from "@/components/map/MapSelectTreesModal";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import useStore from "@/store/store";
import { Tree } from "@green-ecolution/backend-client";
import { WithAllTrees } from "@/components/map/TreeMarker";
import { useState } from "react";
import SelectedCard from "@/components/general/cards/SelectedCard";

export const Route = createFileRoute("/_protected/map/treecluster/select/tree")(
  {
    component: SelectTrees,
  },
);

function SelectTrees() {
  const clusterState = useStore((state) => state.treecluster);
  const [treeIds, setTreeIds] = useState<number[]>(clusterState.treeIds);
  const navigate = useNavigate({ from: Route.fullPath });

  const handleSave = () => {
    clusterState.setTreeIds(treeIds);
    navigate({ to: "/treecluster/new" });
  };

  const handleCancel = () => {
    navigate({ to: "/treecluster/new" });
  };

  const handleDeleteTree = (treeId: number) => {
    setTreeIds((prev) => prev.filter((id) => id !== treeId));
  };

  const handleTreeClick = (tree: Tree) => {
    setTreeIds((prev) => (!prev.includes(tree.id) ? [...prev, tree.id] : prev));
  };

  return (
    <>
      <MapSelectTreesModal
        onSave={handleSave}
        onCancel={handleCancel}
        treeIds={treeIds}
        title="Bäume auswählen:"
        content={
          <ul className="space-y-3">
            {(treeIds?.length || 0) === 0 ? (
              <li className="text-dark-600">
                <p>Keine Bäume ausgewählt.</p>
              </li>
            ) : (
              treeIds.map((treeId, key) => (
                <li key={key}>
                  <SelectedCard itemId={treeId} onClick={handleDeleteTree} />
                </li>
              ))
            )}
          </ul>
        }
      />
      <WithAllTrees onClick={handleTreeClick} />
    </>
  );
}
