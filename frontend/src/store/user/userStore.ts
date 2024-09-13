import { SubStore } from "../store";
import { UserStore } from "./types";

export const userStore: SubStore<UserStore> = (set, get) => ({
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  setUsername: (username) =>
    set((state) => {
      state.user.username = username;
    }),
  setEmail: (email) =>
    set((state) => {
      state.user.email = email;
    }),
  setFirstName: (firstName) =>
    set((state) => {
      state.user.firstName = firstName;
    }),
  setLastName: (lastName) =>
    set((state) => {
      state.user.lastName = lastName;
    }),
});
