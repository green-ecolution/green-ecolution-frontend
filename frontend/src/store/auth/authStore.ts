import { SubStore } from "../store";
import { AuthStore } from "./types";

export const authStore: SubStore<AuthStore> = (set) => ({
  isAuthenticated: !!localStorage.getItem("refreshToken"),
  token: {
    refreshToken: localStorage.getItem("refreshToken") || "",
    accessToken: "",
    tokenType: "",
    sessionState: "",
    scope: "",
    expiresIn: 0,
    idToken: "",
    notBeforePolicy: 0,
    refreshExpiresIn: 0,
  },
  setIsAuthenticated: (auth) =>
    set((state) => {
      state.auth.isAuthenticated = auth;
    }),
  setToken: (token) =>
    set((state) => {
      localStorage.setItem("refreshToken", token.refreshToken);
      state.auth.isAuthenticated = true;
      state.auth.token = token;
    }),
  logout: () =>
    set((state) => {
      localStorage.removeItem("refreshToken");
      state.auth.isAuthenticated = false;
      state.auth.token = null;
    }),
});

