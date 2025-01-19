import L from "leaflet";
import { SubStore } from "../store";
import { MapStore } from "./types";

export const mapStore: SubStore<MapStore> = (set) => ({
  center: [54.792277136221905, 9.43580607453268],
  boundaries: L.latLngBounds(L.latLng(54.9, 9.6), L.latLng(54.7, 9.3)),
  zoom: 13,
  minZoom: 13,
  maxZoom: 18,
  showSelectModal: false,
  setCenter: (center) =>
    set((state) => {
      state.map.center = center;
    }),
  setZoom: (zoom) =>
    set((state) => {
      state.map.zoom = zoom;
    }),
  setShowSelectModal: (showSelectModal) =>
    set((state) => {
      state.map.showSelectModal = showSelectModal;
    }),
});
