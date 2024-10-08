import { EntitiesTreeSoilCondition } from "@green-ecolution/backend-client";

type NewTreeclusterState = {
  name: string;
  address: string;
  region: string;
  description: string;
  soilCondition: EntitiesTreeSoilCondition;
  treeIds:  number[];
};

type NewTreeclusterActions = {
  setName: (name: string) => void;
  setAddress: (address: string) => void;
  setRegion: (region: string) => void;
  setDescription: (description: string) => void;
  setSoilCondition: (soilCondition: EntitiesTreeSoilCondition) => void;
  setTreeIds: (treeIds: number[]) => void;
};

export type NewTreeclusterStore = NewTreeclusterState & NewTreeclusterActions;
