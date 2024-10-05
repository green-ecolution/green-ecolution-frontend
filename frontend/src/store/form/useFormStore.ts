import {
  TreeClusterCreate,
  TreeClusterUpdate,
} from "@green-ecolution/backend-client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type TreeClusterForm = TreeClusterCreate | TreeClusterUpdate;

type Form = TreeClusterForm;
type FormStoreState = {
  id: string;
  form?: Form;
};

type FormStoreActions = {
  cache: (form: Form) => string;
  reset: (id: string) => void;
};

type FormStore = FormStoreState & FormStoreActions;

const useFormStore = create<FormStore>()(
  devtools(
    immer((set) => ({
      id: "",
      form: undefined,
      cache: (form) => {
        const id = crypto.randomUUID();
        set((state) => {
          state.id = id;
          state.form = form;
        });
        return id;
      },
      reset: (id) => {
        set((state) => {
          state.id = id;
          state.form = undefined;
        });
      },
    })),
  ),
);

export default useFormStore;
