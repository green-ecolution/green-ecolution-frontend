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
  const formStore = useStore((state) => state.form.treecluster);
  const [treeIds, setTreeIds] = useState<number[]>(formStore.treeIds);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate({ from: Route.fullPath });

  const handleSave = () => {
    if (treeIds.length === 0) {
      setShowError(true);
      return;
    }

    formStore.setTrees(treeIds);
    window.history.length > 1 ? window.history.back() : navigate({ to: "/treecluster/new" });
  };

  const handleCancel = () => {
    window.history.length > 1 ? window.history.back() : navigate({ to: "/treecluster/new" });
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
            {(treeIds?.length || 0) === 0 || showError ? (
              <li className="text-red">
                <p>Bitte wählen Sie mindestens einen Baum aus.</p>
              </li>
            ) : (
              treeIds.map((treeId, key, array) => (
                <li key={key}>
                  <SelectedCard treeIds={array} itemId={treeId} onClick={handleDeleteTree} />
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
