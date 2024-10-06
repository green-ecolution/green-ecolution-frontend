import { EntitiesWateringStatus } from "@green-ecolution/backend-client";

const WateringStatusProperties = {
  [EntitiesWateringStatus.WateringStatusUnknown]: {
    color: 'dark-400',
    label: 'Unbekannt',
    description: 'Der Bewässerungsstatus ist unbekannt.',
  },
  [EntitiesWateringStatus.WateringStatusBad]: {
    color: 'red',
    label: 'Sehr trocken',
    description: 'Die Bäume benötigen dringend Wasser.',
  },
  [EntitiesWateringStatus.WateringStatusModerate]: {
    color: 'yellow',
    label: 'Leicht trocken',
    description: 'Die Bäume sind leicht trocken und benötigen etwas Wasser.',
  },
  [EntitiesWateringStatus.WateringStatusGood]: {
    color: 'green-light',
    label: 'In Ordnung',
    description: 'Die Bewässerung ist ausreichend, keine Maßnahmen erforderlich.',
  },
} as const;

type WateringStatusDetails = typeof WateringStatusProperties[EntitiesWateringStatus];

export const getWateringStatusDetails = (status: EntitiesWateringStatus): WateringStatusDetails => {
  return WateringStatusProperties[status];
};