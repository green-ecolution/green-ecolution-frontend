import { EntitiesTreeSoilCondition } from "@green-ecolution/backend-client";

type TreeclusterState = {
  name: string;
  address: string;
  description: string;
  soilCondition: EntitiesTreeSoilCondition;
  treeIds:  number[];
};

type TreeclusterActions = {
  setName: (name: string) => void;
  setAddress: (address: string) => void;
  setDescription: (description: string) => void;
  setSoilCondition: (soilCondition: EntitiesTreeSoilCondition) => void;
  setTreeIds: (treeIds: number[]) => void;
};

export type TreeclusterStore = TreeclusterState & TreeclusterActions;
