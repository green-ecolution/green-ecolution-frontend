import { SubStore } from "../store";
import { AuthStore } from "./types";

export const authStore: SubStore<AuthStore> = (set, get) => ({
  isAuthenticated: false,
  token: null,
  setIsAuthenticated: (auth) =>
    set((state) => {
      state.auth.isAuthenticated = auth;
    }),
  setToken: (token) =>
    set((state) => {
      state.auth.token = token;
    }),
});

