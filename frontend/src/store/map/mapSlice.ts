import { MapStateCreator } from "./store";

export interface MapControllSlice {
  center: [number, number];
  zoom: number;
  setCenter: (center: [number, number]) => void;
  setZoom: (zoom: number) => void;
}

const createMapControllSlice: MapStateCreator<MapControllSlice> = (set) => ({
  center: [54.792277136221905, 9.43580607453268],
  zoom: 13,
  setCenter: (center) =>
    set((state) => {
      state.map.center = center;
    }),
  setZoom: (zoom) =>
    set((state) => {
      state.map.zoom = zoom;
    }),
});

export default createMapControllSlice;
