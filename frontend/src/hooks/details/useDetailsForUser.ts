export type UserStatus = 'available' | 'absent';

const UserStatusProperties = {
  available: {
    label: 'Verfügbar',
    color: 'green-dark',
  },
  absent: {
    label: 'Abwesend',
    color: 'red',
  },
  unknown: {
    label: 'Unbekannt',
    color: 'dark-400',
  },
} as const;

export type UserRole = 'tbz' | 'green-ecolution' | 'smarte-grenzregion';

const UserRoleProperties = {
  tbz: {
    label: 'TBZ',
  },
  'green-ecolution': {
    label: 'Green Ecolution',
  },
  'smarte-grenzregion': {
    label: 'Smarte Grenzregion',
  },
  unknown: {
    label: 'Unbekannt',
  },
} as const;

type UserStatusDetails = (typeof UserStatusProperties)[UserStatus | 'unknown'];

export const getUserStatusDetails = (
  status: UserStatus | string
): UserStatusDetails => {
  return UserStatusProperties[status as UserStatus] || UserStatusProperties.unknown;
};

type UserRoleDetails = (typeof UserRoleProperties)[UserRole | 'unknown'];

export const getUserRoleDetails = (
  roles: { id: string; label: string }[]
): UserRoleDetails[] => {
  return roles.map(role => {
    return UserRoleProperties[role.label as UserRole] || UserRoleProperties.unknown;
  });
};
