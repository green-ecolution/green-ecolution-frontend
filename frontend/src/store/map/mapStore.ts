import { SubStore } from "../store";
import { MapStore } from "./types";

export const mapStore: SubStore<MapStore> = (set) => ({
  zoom: 13,
  minZoom: 13,
  maxZoom: 18,
  showSelectModal: false,

  setZoom: (zoom) => set((state) => { state.map.zoom = zoom; }),
  setShowSelectModal: (showSelectModal) => set((state) => { state.map.showSelectModal = showSelectModal; }),
})
