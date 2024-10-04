import { TreeClusterCreate } from "@green-ecolution/backend-client";

interface TreeclusterFormState extends TreeClusterCreate {}

type TreeclusterFormActions = {
  cache: (cluster: TreeClusterCreate) => void;
  reset: () => void;
  removeTree: (treeId: number) => void;
  addTree: (treeId: number) => void;
};

export type TreeclusterFormStore = TreeclusterFormState & TreeclusterFormActions;
