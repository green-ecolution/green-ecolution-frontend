import { decodeJWT } from '@/lib/utils'
import { SubStore } from '../store'
import { UserStore } from './types'
import { KeycloakJWT } from '@/lib/types/keycloak'
import { parseUserRole } from '@/hooks/details/useDetailsForUserRole'
import { parseUserStatus } from '@/hooks/details/useDetailsForUserStatus'
import { UserStatus } from '@green-ecolution/backend-client'

export const userStore: SubStore<UserStore> = (set, get) => ({
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  drivingLicense: '',
  userRoles: [],
  status: UserStatus.UserStatusUnknown,
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
  setDrivingLicense: (drivingLicense) =>
    set((state) => {
      state.user.drivingLicense = drivingLicense
    }),
  setStatus: (status) =>
    set((state) => {
      state.user.status = status
    }),
  setUserRoles: (userRoles) =>
    set((state) => {
      state.user.userRoles = userRoles
    }),
  setFromJwt: (jwt) =>
    set((state) => {
      const jwtInfo = decodeJWT<KeycloakJWT>(jwt)
      if (jwtInfo) {
        state.user.email = jwtInfo.email
        state.user.username = jwtInfo.preferred_username
        state.user.firstName = jwtInfo.given_name
        state.user.lastName = jwtInfo.family_name
        state.user.drivingLicense = jwtInfo.driving_license
        state.user.userRoles = jwtInfo.user_roles.map(parseUserRole)
        state.user.status = parseUserStatus(jwtInfo.status)
      }
    }),
  isEmpty: () => {
    return (
      !get().user.username ||
      !get().user.email ||
      !get().user.firstName ||
      !get().user.lastName ||
      !get().user.drivingLicense ||
      !get().user.userRoles ||
      !get().user.status
    )
  },
  clear: () =>
    set((state) => {
      state.user.username = ''
      state.user.email = ''
      state.user.firstName = ''
      state.user.lastName = ''
      state.user.drivingLicense = ''
      state.user.userRoles = []
      state.user.status = UserStatus.UserStatusUnknown
    }),
})
