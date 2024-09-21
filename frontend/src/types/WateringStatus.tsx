export enum WateringStatus {
  unknown = 'Keine Angaben',
  bad = 'Sehr trocken',
  moderate = 'Leicht trocken',
  good = 'In Ordnung',
}

// Define a mapping of watering statuses to their properties
const WateringStatusProperties = {
  [WateringStatus.unknown]: {
    color: 'dark-400',
    description: 'Der Bewässerungsstatus ist unbekannt.',
  },
  [WateringStatus.bad]: {
    color: 'red',
    description: 'Die Bäume benötigen dringend Wasser.',
  },
  [WateringStatus.moderate]: {
    color: 'yellow',
    description: 'Die Bäume sind leicht trocken und benötigen etwas Wasser.',
  },
  [WateringStatus.good]: {
    color: 'green-light',
    description: 'Die Bewässerung ist ausreichend, keine Maßnahmen erforderlich.',
  },
} as const;

type WateringStatusDetails = typeof WateringStatusProperties[WateringStatus];

export const getWateringStatusDetails = (status: WateringStatus): WateringStatusDetails => {
  return WateringStatusProperties[status];
};


