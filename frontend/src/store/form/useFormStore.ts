import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { DeepPartial } from "utility-types";
import { Draft } from "immer";

interface FormStoreState<Form> {
  form?: Form;
  type: "edit" | "new";
}

interface FormStoreActions<Form> {
  commit: (form?: Form | DeepPartial<Form>) => void;
  reset: () => void;
  isEmpty: () => boolean;
  setType: (type: "edit" | "new") => void;
}

export type FormStore<T> = FormStoreState<T> & FormStoreActions<T>;

function createFormStore<Form>() {
  return create<FormStore<Form>>()(
    devtools(
      immer((set, get) => ({
        form: undefined,
        type: "new",
        commit: (form) => {
          set((state) => {
            state.form = form as Draft<Form> | undefined;
          });
        },
        reset: () => {
          set((state) => {
            state.form = undefined;
          });
        },
        isEmpty: () => {
          return get().form === undefined;
        },
        setType: (type) => {
          set((state) => {
            state.type = type;
          });
        },
      })),
    ),
  );
}

const useFormStore = createFormStore()
export default useFormStore;
