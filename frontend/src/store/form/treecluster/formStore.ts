import {
  EntitiesTreeSoilCondition,
} from "@green-ecolution/backend-client";
import { SubStore } from "../../store";
import { TreeclusterFormStore } from "./types";

export const treeclusterStore: SubStore<TreeclusterFormStore> = (set, get) => ({
  name: "",
  address: "",
  description: "",
  soilCondition: EntitiesTreeSoilCondition.TreeSoilConditionUnknown,
  treeIds: [],
  cache: (cluster) => {
    set((state) => {
      state.form.treecluster.name = cluster.name;
      state.form.treecluster.address = cluster.address;
      state.form.treecluster.description = cluster.description;
      state.form.treecluster.soilCondition = cluster.soilCondition;
    });
  },
  reset: () => {
    set((state) => {
      state.form.treecluster.treeIds = [];
      state.form.treecluster.name = "";
      state.form.treecluster.address = "";
      state.form.treecluster.description = "";
      state.form.treecluster.soilCondition =
        EntitiesTreeSoilCondition.TreeSoilConditionUnknown;
    });
  },
  removeTree: (treeId: number) => {
    set((state) => {
      state.form.treecluster.treeIds = state.form.treecluster.treeIds.filter(
        (id) => id !== treeId,
      );
    });
  },
  addTree: (treeId: number) => {
    set((state) => {
      const exists = get().form.treecluster.treeIds.includes(treeId);
      if (exists) return;
      state.form.treecluster.treeIds.push(treeId);
    });
  },
  setTrees: (ids: number[]) => {
    set((state) => {
      state.form.treecluster.treeIds = ids;
    });
  },
  isEmpty: () => {
    return get().form.treecluster.treeIds.length === 0 
      && !get().form.treecluster.name 
      && !get().form.treecluster.address 
      && !get().form.treecluster.description 
      && get().form.treecluster.soilCondition === EntitiesTreeSoilCondition.TreeSoilConditionUnknown
  },
});
