type UserState = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  drivingLicense: string;
  userRoles: string[];
  status: string;
};

type UserActions = {
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setDrivingLicense: (drivingLicense: string) => void;
  setUserRoles: (userRoles: string[]) => void;
  setStatus: (status: string) => void;
  setFromJwt: (jwt: string) => void;
  isEmpty: () => boolean;
  clear: () => void;
};

export type UserStore = UserState & UserActions;

