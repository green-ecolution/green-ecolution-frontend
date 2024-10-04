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
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate({ from: Route.fullPath });

  const handleSave = () => {
    if (formStore.treeIds.length === 0) {
      setShowError(true);
      return;
    }

    window.history.length > 1 ? window.history.back() : navigate({ to: "/treecluster/new" });
  };

  const handleCancel = () => {
    window.history.length > 1 ? window.history.back() : navigate({ to: "/treecluster/new" });
  };

  const handleDeleteTree = (treeId: number) => {
    formStore.removeTree(treeId);
  };

  const handleTreeClick = (tree: Tree) => {
    formStore.addTree(tree.id);
  };

  return (
    <>
      <MapSelectTreesModal
        onSave={handleSave}
        onCancel={handleCancel}
        treeIds={formStore.treeIds}
        title="Bäume auswählen:"
        content={
          <ul className="space-y-3">
            {(formStore.treeIds?.length || 0) === 0 || showError ? (
              <li className="text-red">
                <p>Bitte wählen Sie mindestens einen Baum aus.</p>
              </li>
            ) : (
              formStore.treeIds.map((treeId, key, array) => (
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
