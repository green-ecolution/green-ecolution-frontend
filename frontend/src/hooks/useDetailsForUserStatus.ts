export enum UserStatus {
  Available = 'available',
  NotAvailable = 'not_available',
  OnDuty = 'on_duty',
  Unknown = 'unknown'
}

export const UserStatusOptions = [
  {
    value: UserStatus.Available,
    label: 'Verfügbar',
    color: 'green-dark',
  },
  {
    value: UserStatus.NotAvailable,
    label: 'Nicht verfügbar',
    color: 'red',
  },
  {
    value: UserStatus.OnDuty,
    label: 'Im Einsatz',
    color: 'green-light',
  },
  {
    value: UserStatus.Unknown,
    label: 'Unbekannt',
    color: 'dark-400',
  },
]

export const getUserStatusDetails = (status: UserStatus) => {
  const match = UserStatusOptions.find((option) => option.value === status)
  return (
    match ||
    UserStatusOptions.find(
      (option) => option.value === UserStatus.Unknown
    )
  )
}