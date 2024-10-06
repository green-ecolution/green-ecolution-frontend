import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { subscribeWithSelector } from "zustand/middleware";
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

const useFormStore = create<FormStore<any>>()(
  devtools(
    immer(
      subscribeWithSelector((set, get) => ({
        form: undefined,
        type: "new",
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
        setType: (type) => {
          set((state) => {
            state.type = type;
          });
        },
      })),
    ),
  ),
);

export default useFormStore;
