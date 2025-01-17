import { UserRole, UserStatus } from "@green-ecolution/backend-client";

type UserState = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  drivingLicense: string;
  userRoles: UserRole[];
  status: UserStatus;
};

type UserActions = {
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setDrivingLicense: (drivingLicense: string) => void;
  setUserRoles: (userRoles: UserRole[]) => void;
  setStatus: (status: UserStatus) => void;
  setFromJwt: (jwt: string) => void;
  isEmpty: () => boolean;
  clear: () => void;
};

export type UserStore = UserState & UserActions;

