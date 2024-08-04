import { StateCreator } from "zustand";
import { Store } from "./store";

export interface MapControllSlice {
  center: [number, number];
  zoom: number;
  setCenter: (center: [number, number]) => void;
  setZoom: (zoom: number) => void;
}

const createMapControllSlice: StateCreator<
  Store,
  [["zustand/devtools", never]],
  [],
  MapControllSlice
> = (set) => ({
  center: [54.792277136221905, 9.43580607453268],
  zoom: 13,
  setCenter: (center) => set((state) => ({ map: { ...state.map, center } })),
  setZoom: (zoom) => set((state) => ({ map: { ...state.map, zoom } })),
});

export default createMapControllSlice;
