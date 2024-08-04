import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from 'zustand/middleware/immer'
import createTooltipSlice, { TooltipSlice } from "./tooltipSlice";
import createMapControllSlice, { MapControllSlice } from "./mapSlice";

export interface Store {
  map: MapControllSlice;
  tooltip: TooltipSlice;
};

export type MapStateCreator<T> = StateCreator<Store, [["zustand/devtools", never], ["zustand/immer", never]], [], T>;

const useMapStore = create<Store>()(
  devtools(immer((...args) => ({
    map: createMapControllSlice(...args),
    tooltip: createTooltipSlice(...args),
  }))),
);

export default useMapStore;
