export enum WateringStatus {
  unknown = 'Keine Angaben',
  bad = 'Sehr trocken',
  moderate = 'Leicht trocken',
  good = 'In Ordnung',
}

// Match watering status enum to color
export const WateringStatusColor = {
  [WateringStatus.unknown]: { color: 'dark-600' },
  [WateringStatus.bad]: { color: 'red' },
  [WateringStatus.moderate]: { color: 'yellow' },
  [WateringStatus.good]: { color: 'green-light' },
};

// Match watering status to recommendation
export const WateringStatusDescription = {
  [WateringStatus.unknown]: 'Der Bewässerungsstatus ist unbekannt.',
  [WateringStatus.bad]: 'Die Bäume benötigen dringend Wasser.',
  [WateringStatus.moderate]: 'Die Bäume sind leicht trocken und benötigen etwas Wasser.',
  [WateringStatus.good]: 'Die Bewässerung ist ausreichend, keine Maßnahmen erforderlich.',
};