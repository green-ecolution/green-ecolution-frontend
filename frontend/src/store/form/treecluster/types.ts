import {
    EntitiesTreeSoilCondition,
  TreeClusterCreate,
} from "@green-ecolution/backend-client";

interface TreeclusterFormState extends TreeClusterCreate {}

type TreeclusterFormFields = {
  name: string;
  address: string;
  description: string;
  soilCondition: EntitiesTreeSoilCondition;
};

type TreeclusterFormActions = {
  cache: (fields: TreeclusterFormFields) => void;
  reset: () => void;
  removeTree: (treeId: number) => void;
  addTree: (treeId: number) => void;
  setTrees: (ids: number[]) => void;
  isEmpty: () => boolean;
};

export type TreeclusterFormStore = TreeclusterFormState &
  TreeclusterFormActions;
