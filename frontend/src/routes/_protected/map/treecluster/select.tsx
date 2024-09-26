import MapSelectTreesModal from "@/components/map/MapSelectTreesModal";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import useStore from "@/store/store";
import { Tree } from "@green-ecolution/backend-client";
import { WithAllTrees } from "@/components/map/TreeMarker";
import { useState } from "react";

export const Route = createFileRoute("/_protected/map/treecluster/select")({
  component: SelectTrees,
});

function SelectTrees() {
  const [treeIds, setTreeIds] = useState<number[]>([]);
  const navigate = useNavigate({ from: Route.fullPath });
  const newTreecluster = useStore((state) => state.newTreecluster);

  const handleSave = () => {
    newTreecluster.setTreeIds(treeIds);
    navigate({ to: "/treecluster/new" });
  };

  const handleCancel = () => {
    newTreecluster.setTreeIds([]);
    navigate({ to: "/treecluster/new" });
  };

  const handleDeleteTree = (treeId: number) => {
    setTreeIds((prev) => prev.filter((id) => id !== treeId));
  };

  const handleTreeClick = (tree: Tree) => {
    setTreeIds((prev) => [...prev, tree.id]);
  };

  return (
    <>
      <MapSelectTreesModal
        onSave={handleSave}
        onCancel={handleCancel}
        treeIds={treeIds}
        onDeleteTree={handleDeleteTree}
      />
      <WithAllTrees onClick={handleTreeClick} />
    </>
  );
}
