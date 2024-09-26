import { Region } from "@/types/Region";
import { EntitiesTreeSoilCondition } from "@green-ecolution/backend-client";

type NewTreeclusterState = {
  name: string;
  address: string;
  region: Region;
  description: string;
  soilCondition: EntitiesTreeSoilCondition;
  treeIds:  number[];
};

type NewTreeclusterActions = {
  setName: (name: string) => void;
  setAddress: (address: string) => void;
  setRegion: (region: Region) => void;
  setDescription: (description: string) => void;
  setSoilCondition: (soilCondition: EntitiesTreeSoilCondition) => void;
  setTreeIds: (treeIds: number[]) => void;
};

export type NewTreeclusterStore = NewTreeclusterState & NewTreeclusterActions;
