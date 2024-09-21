import { WateringStatus } from "@/types/WateringStatus";

export function treeDemoData() {
  return [
    {
      id: 0,
      species: 'Quercus robur',
      number: '100123',
      hasSensor: true,
      status: WateringStatus.bad,
    },
    {
      id: 1,
      species: 'Crataegus monogyna',
      number: '100123',
      hasSensor: true,
      status: WateringStatus.moderate,
    },
    {
      id: 2,
      species: 'Crataegus monogyna',
      number: '100123',
      hasSensor: true,
      status: WateringStatus.good,
    },
    {
      id: 3,
      species: 'Quercus robur',
      number: '100123',
      hasSensor: false,
      status: WateringStatus.unknown,
    },
    {
      id: 4,
      species: 'Quercus robur',
      number: '100123',
      hasSensor: false,
      status: WateringStatus.unknown,
    },
  ];
}
