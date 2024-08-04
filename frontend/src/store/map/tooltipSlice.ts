import { Tree } from "@green-ecolution/backend-client";
import { StateCreator } from "zustand";
import { Store } from "./store";

export interface TooltipSlice {
  isOpen: boolean;
  content: Tree;
  toggle: () => void;
  open: (content: Tree) => void;
  close: () => void;
}

const createTooltipSlice: StateCreator<
  Store,
  [["zustand/devtools", never]],
  [],
  TooltipSlice
> = (set) => ({
  isOpen: false,
  content: {} as Tree,
  toggle: () =>
    set((state) => ({
      tooltip: { ...state.tooltip, isOpen: !state.tooltip.isOpen },
    })),
  open: (content) =>
    set((state) => ({ tooltip: { ...state.tooltip, isOpen: true, content } })),
  close: () =>
    set((state) => ({
      tooltip: { ...state.tooltip, isOpen: false, content: {} as Tree },
    })),
});

export default createTooltipSlice;
