export enum WateringStatus {
  unknown = 'Keine Angaben',
  bad = 'Sehr trocken',
  moderate = 'Leicht trocken',
  good = 'In Ordnung',
}

// Match enum to color
export const WateringStatusColor = {
  [WateringStatus.unknown]: { color: 'dark-600' },
  [WateringStatus.bad]: { color: 'red' },
  [WateringStatus.moderate]: { color: 'yellow' },
  [WateringStatus.good]: { color: 'green-light' },
};

// Get enum by key
export const mapKeysToOptions = (keys: string[]): { name: string; key: string }[] => {
  return keys.map(key => ({
    key,
    name: WateringStatus[key as keyof typeof WateringStatus]
  }));
};