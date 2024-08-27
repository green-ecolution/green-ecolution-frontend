export enum WateringStatus {
  unknown = 'Keine Angaben',
  bad = 'Sehr trocken',
  moderate = 'Leicht trocken',
  good = 'In Ordnung',
}

export const WateringStatusColor = {
  [WateringStatus.unknown]: {
    color: 'dark-600',
  },
  [WateringStatus.bad]: {
    color: 'red',
  },
  [WateringStatus.moderate]: {
    color: 'yellow',
  },
  [WateringStatus.good]: {
    color: 'green-light',
  },
};