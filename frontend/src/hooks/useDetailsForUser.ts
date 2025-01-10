export type UserStatus = 'available' | 'absent';

const UserStatusProperties = {
  available: {
    label: 'Verfügbar',
  },
  absent: {
    label: 'Abwesend',
  },
  unknown: {
    label: 'Unbekannt',
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
  roles: { id: string; name: string }[]
): UserRoleDetails => {
  const primaryRole = roles.length > 0 ? roles[0].name : 'unknown';
  return UserRoleProperties[primaryRole as UserRole] || UserRoleProperties.unknown;
};
