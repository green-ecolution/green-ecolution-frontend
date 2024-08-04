import { Tree } from "@green-ecolution/backend-client";
import { MapStateCreator } from "./store";

export interface TooltipSlice {
  isOpen: boolean;
  content: Tree;
  toggle: () => void;
  open: (content: Tree) => void;
  close: () => void;
}

const createTooltipSlice: MapStateCreator<TooltipSlice> = (set) => ({
  isOpen: false,
  content: {} as Tree,
  toggle: () =>
    set((state) => {
      state.tooltip.isOpen = !state.tooltip.isOpen;
    }),
  open: (content) =>
    set((state) => {
      state.tooltip.isOpen = true;
      state.tooltip.content = content;
    }),
  close: () =>
    set((state) => {
      state.tooltip.isOpen = false;
      state.tooltip.content = {} as Tree;
    }),
});

export default createTooltipSlice;
