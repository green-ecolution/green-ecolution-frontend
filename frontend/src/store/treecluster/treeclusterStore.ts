import { EntitiesTreeSoilCondition } from "@green-ecolution/backend-client";
import { SubStore } from "../store";
import { TreeclusterStore } from "./types";

export const treeclusterStore: SubStore<TreeclusterStore> = (set, get) => ({
  name: "",
  address: "",
  description: "",
  soilCondition: EntitiesTreeSoilCondition.TreeSoilConditionUnknown,
  treeIds: [],
  setName: (name) =>
    set((state) => {
      state.treecluster.name = name;
    }),
  setAddress: (address) => 
    set((state) => {
      state.treecluster.address = address;
    }),
  setDescription: (description) => 
    set((state) => {
      state.treecluster.description = description;
    }),
  setSoilCondition: (soilCondition) => 
    set((state) => {
      state.treecluster.soilCondition = soilCondition;
    }),
  setTreeIds: (treeIds) =>
    set((state) => {
      state.treecluster.treeIds = treeIds;
    }),
});
