import { MapStateCreator } from "./store";

export interface MapControllSlice {
  center: [number, number];
  zoom: number;
  minZoom: number;
  maxZoom: number;
  setCenter: (center: [number, number]) => void;
  setZoom: (zoom: number) => void;
}

const createMapControllSlice: MapStateCreator<MapControllSlice> = (set) => ({
  center: [54.792277136221905, 9.43580607453268],
  zoom: 13,
  minZoom: 13,
  maxZoom: 18,
  setCenter: (center) =>
    set((state) => {
      state.map.center = center;
    }),
  setZoom: (zoom) =>
    set((state) => {
      const newZoom = Math.max(13, Math.min(18, zoom));
      state.map.zoom = newZoom;
    }),
});

export default createMapControllSlice;
