import { FakeTree } from "@/context/FakeTreeDataContext";
import { Tree } from "@green-ecolution/backend-client";
import { create } from "zustand";

type State = {
  displayFakeTrees: boolean;
  tooltipOpen: boolean;
  tooltipContent: Tree;
  center: [number, number];
  zoom: number;
};

type Actions = {
  toggleDisplayFakeTrees: () => void;
  setDisplayFakeTrees: (value: boolean) => void;
  openTooltip: () => void;
  closeTooltip: () => void;
  setTooltipContent: (content: Tree) => void;
  setCenter: (center: [number, number]) => void;
  setZoom: (zoom: number) => void;
};

type Store = State & Actions;

const useMapStore = create<Store>((set) => ({
  displayFakeTrees: false,
  toggleDisplayFakeTrees: () =>
    set((state) => ({ displayFakeTrees: !state.displayFakeTrees })),
  setDisplayFakeTrees: (value) => set({ displayFakeTrees: value }),
  tooltipOpen: false,
  openTooltip: () => set({ tooltipOpen: true }),
  closeTooltip: () => set({ tooltipOpen: false }),
  tooltipContent: {} as Tree,
  setTooltipContent: (content) => set({ tooltipContent: content }),
  center: [54.792277136221905, 9.43580607453268],
  setCenter: (center) => set({ center }),
  zoom: 13,
  setZoom: (zoom) => set({ zoom }),
}));

export const useDisplayFakeTrees = () =>
  useMapStore((state) => state.displayFakeTrees);
export const useToggleDisplayFakeTrees = () =>
  useMapStore((state) => state.toggleDisplayFakeTrees);
export const useSetDisplayFakeTrees = () => (value: boolean) => {
  useMapStore.setState({ displayFakeTrees: value });
};

export const useTooltipOpen = () => useMapStore((state) => state.tooltipOpen);
export const useOpenTooltip = () => useMapStore((state) => state.openTooltip);
export const useCloseTooltip = () => useMapStore((state) => state.closeTooltip);
export const useTooltipContent = () =>
  useMapStore((state) => state.tooltipContent);
export const useSetTooltipContent = () => (content: Tree | FakeTree) => {
  useMapStore.setState({ tooltipContent: content });
};

export default useMapStore;
