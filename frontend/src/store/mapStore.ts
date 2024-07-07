import { FakeTree } from "@/context/FakeTreeDataContext";
import { Tree } from "@green-ecolution/backend-client";
import { create } from "zustand";

type State = {
  displayFakeTrees: boolean;
  tooltipOpen: boolean;
  tooltipContent: Tree;
};

type Actions = {
  toggleDisplayFakeTrees: () => void;
  setDisplayFakeTrees: (value: boolean) => void;
  openTooltip: () => void;
  closeTooltip: () => void;
  setTooltipContent: (content: Tree) => void;
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
