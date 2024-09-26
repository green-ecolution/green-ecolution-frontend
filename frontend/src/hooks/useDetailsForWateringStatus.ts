import { EntitiesTreeClusterWateringStatus } from "@green-ecolution/backend-client";

const WateringStatusProperties = {
  [EntitiesTreeClusterWateringStatus.TreeClusterWateringStatusUnknown]: {
    color: 'dark-400',
    label: 'Unbekannt',
    description: 'Der Bewässerungsstatus ist unbekannt.',
  },
  [EntitiesTreeClusterWateringStatus.TreeClusterWateringStatusBad]: {
    color: 'red',
    label: 'Sehr trocken',
    description: 'Die Bäume benötigen dringend Wasser.',
  },
  [EntitiesTreeClusterWateringStatus.TreeClusterWateringStatusModerate]: {
    color: 'yellow',
    label: 'Leicht trocken',
    description: 'Die Bäume sind leicht trocken und benötigen etwas Wasser.',
  },
  [EntitiesTreeClusterWateringStatus.TreeClusterWateringStatusGood]: {
    color: 'green-light',
    label: 'In Ordnung',
    description: 'Die Bewässerung ist ausreichend, keine Maßnahmen erforderlich.',
  },
} as const;

type WateringStatusDetails = typeof WateringStatusProperties[EntitiesTreeClusterWateringStatus];

export const getWateringStatusDetails = (status: EntitiesTreeClusterWateringStatus): WateringStatusDetails => {
  return WateringStatusProperties[status];
};