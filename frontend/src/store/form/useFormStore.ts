import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { DeepPartial } from "react-hook-form";

type FormStoreState<Form> = {
  form?: Form;
  type: "edit" | "new";
};

type FormStoreActions<Form> = {
  commit: (form?: Form | DeepPartial<Form>) => void;
  reset: () => void;
  isEmpty: () => boolean;
  setType: (type: "edit" | "new") => void;
};

export type FormStore<T> = FormStoreState<T> & FormStoreActions<T>;

// TODO: find better solution
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const useFormStore = create<FormStore<any>>()(
  devtools(
    immer((set, get) => ({
      form: undefined,
      type: "new",
      commit: (form) => {
        set((state) => {
          state.form = form;
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

export default useFormStore;
