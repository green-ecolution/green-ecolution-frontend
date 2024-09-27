import MapSelectTreesModal from "@/components/map/MapSelectTreesModal";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import useStore from "@/store/store";
import { Tree } from "@green-ecolution/backend-client";
import { WithAllTrees } from "@/components/map/TreeMarker";
import { useState } from "react";

export const Route = createFileRoute("/_protected/map/treecluster/select/tree")(
  {
    component: SelectTrees,
  },
);

function SelectTrees() {
  const newTreecluster = useStore((state) => state.newTreecluster);
  const [treeIds, setTreeIds] = useState<number[]>(newTreecluster.treeIds);
  const navigate = useNavigate({ from: Route.fullPath });

  const handleSave = () => {
    newTreecluster.setTreeIds(treeIds);
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
        onDeleteTree={handleDeleteTree}
      />
      <WithAllTrees onClick={handleTreeClick} />
    </>
  );
}
