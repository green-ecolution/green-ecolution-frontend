import { create } from "zustand";
import { devtools } from "zustand/middleware";
import createTooltipSlice, { TooltipSlice } from "./tooltipSlice";
import createMapControllSlice, { MapControllSlice } from "./mapSlice";

export interface Store {
  map: MapControllSlice;
  tooltip: TooltipSlice;
};

const useMapStore = create<Store>()(
  devtools((...args) => ({
    map: createMapControllSlice(...args),
    tooltip: createTooltipSlice(...args),
  })),
);

export default useMapStore;
