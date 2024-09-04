
type MapState = {
  center: [number, number];
  zoom: number;
  minZoom: number;
  maxZoom: number;
};

type MapActions = {
  setCenter: (center: [number, number]) => void;
  setZoom: (zoom: number) => void;
};

export type MapStore = MapState & MapActions;
