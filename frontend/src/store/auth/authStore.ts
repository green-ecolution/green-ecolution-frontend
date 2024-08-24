import { ClientToken } from "@green-ecolution/backend-client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type State = {
  isAuthenticated: boolean;
  token: ClientToken | null;
  apiHeader: string;
};

type Actions = {
  setIsAuthenticated: (auth: boolean) => void;
  setAccessToken: (token: string) => void;
};

type Store = State & Actions;

const useAuthStore = create<Store>()(
  devtools(
    immer((set) => ({
      isAuthenticated: false,
      token: null,
      setIsAuthenticated: (auth) => set((state) => ({ ...state, isAuthenticated: auth })),
      setAccessToken: (token) => set((state) => ({ ...state, accessToken: token })),
      apiHeader: "",
    }))
  )
);

export default useAuthStore;
