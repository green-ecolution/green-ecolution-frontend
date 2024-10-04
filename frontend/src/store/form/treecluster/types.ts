import { TreeClusterCreate, TreeClusterUpdate } from "@green-ecolution/backend-client";

interface TreeclusterFormState extends TreeClusterCreate {}

type TreeclusterFormActions = {
  cache: (cluster: TreeClusterCreate | TreeClusterUpdate) => void;
  reset: () => void;
  removeTree: (treeId: number) => void;
  addTree: (treeId: number) => void;
  setTrees: (ids: number[]) => void;
};

export type TreeclusterFormStore = TreeclusterFormState & TreeclusterFormActions;
