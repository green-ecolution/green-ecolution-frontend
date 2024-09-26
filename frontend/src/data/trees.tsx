import { EntitiesTreeClusterWateringStatus } from "@green-ecolution/backend-client";

export function treeDemoData() {
  return [
    {
      id: 0,
      species: 'Quercus robur',
      number: '100123',
      hasSensor: true,
      status: EntitiesTreeClusterWateringStatus.TreeClusterWateringStatusGood,
    },
    {
      id: 1,
      species: 'Crataegus monogyna',
      number: '100123',
      hasSensor: true,
      status: EntitiesTreeClusterWateringStatus.TreeClusterWateringStatusModerate,
    },
    {
      id: 2,
      species: 'Crataegus monogyna',
      number: '100123',
      hasSensor: true,
      status: EntitiesTreeClusterWateringStatus.TreeClusterWateringStatusGood,
    },
    {
      id: 3,
      species: 'Quercus robur',
      number: '100123',
      hasSensor: false,
      status: EntitiesTreeClusterWateringStatus.TreeClusterWateringStatusUnknown,
    },
    {
      id: 4,
      species: 'Quercus robur',
      number: '100123',
      hasSensor: false,
      status: EntitiesTreeClusterWateringStatus.TreeClusterWateringStatusUnknown,
    },
  ];
}
