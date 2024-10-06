import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { subscribeWithSelector } from "zustand/middleware";
import { DeepPartial } from "react-hook-form";

type FormStoreState<Form> = {
  form?: Form;
};

type FormStoreActions<Form> = {
  commit: (form: DeepPartial<Form>) => void;
  reset: () => void;
  isEmpty: () => boolean;
};

export type FormStore<T> = FormStoreState<T> & FormStoreActions<T>;

const useFormStore = create<FormStore<any>>()(
  devtools(
    immer(
      subscribeWithSelector((set, get) => ({
        form: undefined,
        commit: (form) => {
          console.log("commit", form);
          set((state) => {
            state.form = form;
          });
        },
        reset: () => {
          console.log("reset before", get().form);
          set((state) => {
            state.form = undefined;
          });
          console.log("reset after", get().form);
        },
        isEmpty: () => {
          return get().form === undefined;
        },
      })),
    ),
  ),
);

export default useFormStore;
