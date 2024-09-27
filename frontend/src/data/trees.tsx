import { SensorStatus } from "@/hooks/useDetailsForSensorStatus";
import { EntitiesTreeClusterWateringStatus } from "@green-ecolution/backend-client";

export function treeDemoData() {
  return [
    {
      id: 0,
      species: 'Quercus robur',
      number: '100123',
      hasSensor: true,
      status: EntitiesTreeClusterWateringStatus.TreeClusterWateringStatusGood,
      latitude: '54.774471',
      longitude: '9.433653',
      sensor: SensorStatus.SensorStatusOffline,
    },
    {
      id: 1,
      species: 'Crataegus monogyna',
      number: '100123',
      hasSensor: true,
      status: EntitiesTreeClusterWateringStatus.TreeClusterWateringStatusModerate,
      latitude: '54.774471',
      longitude: '9.433653',
      sensor: SensorStatus.SensorStatusOnline,
    },
    {
      id: 2,
      species: 'Crataegus monogyna',
      number: '100123',
      hasSensor: true,
      status: EntitiesTreeClusterWateringStatus.TreeClusterWateringStatusGood,
      latitude: '54.774471',
      longitude: '9.433653',
      sensor: SensorStatus.SensorStatusOnline,
    },
    {
      id: 3,
      species: 'Quercus robur',
      number: '100123',
      hasSensor: false,
      status: EntitiesTreeClusterWateringStatus.TreeClusterWateringStatusUnknown,
      latitude: '54.774471',
      longitude: '9.433653',
      sensor: SensorStatus.SensorStatusUnknown,
    },
    {
      id: 4,
      species: 'Quercus robur',
      number: '100123',
      hasSensor: false,
      status: EntitiesTreeClusterWateringStatus.TreeClusterWateringStatusUnknown,
      latitude: '54.774471',
      longitude: '9.433653',
      sensor: SensorStatus.SensorStatusOffline,
    },
  ];
}
