import { decodeJWT } from '@/lib/utils'
import { SubStore } from '../store'
import { UserStore } from './types'
import { KeycloakJWT } from '@/lib/types/keycloak'

export const userStore: SubStore<UserStore> = (set, get) => ({
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  setUsername: (username) =>
    set((state) => {
      state.user.username = username
    }),
  setEmail: (email) =>
    set((state) => {
      state.user.email = email
    }),
  setFirstName: (firstName) =>
    set((state) => {
      state.user.firstName = firstName
    }),
  setLastName: (lastName) =>
    set((state) => {
      state.user.lastName = lastName
    }),
  setFromJwt: (jwt) =>
    set((state) => {
      const jwtInfo = decodeJWT<KeycloakJWT>(jwt)
      if (jwtInfo) {
        state.user.email = jwtInfo.email
        state.user.username = jwtInfo.preferred_username
        state.user.firstName = jwtInfo.given_name
        state.user.lastName = jwtInfo.family_name
      }
    }),
  isEmpty: () => {
    return (
      !get().user.username ||
      !get().user.email ||
      !get().user.firstName ||
      !get().user.lastName
    )
  },
})
