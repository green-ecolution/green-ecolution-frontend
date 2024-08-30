export enum Region {
  engelsby = 'Engelsby',
  friesischerBerg = 'Friesischer Berg',
  fruerlund = 'Fruerlund',
  innenstadt = 'Innenstadt',
  juergensby = 'Jürgensby',
  muerwik = 'Mürwik',
  neustadt = 'Neustadt',
  nordstadt = 'Nordstadt',
  sandberg = 'Sandberg',
  suedstadt = 'Südstadt',
  tarup = 'Tarup',
  weiche = 'Weiche',
}

// Get enum by key
export const mapKeysToOptions = (keys: string[]): { name: string; key: string }[] => {
  return keys.map(key => ({
    key,
    name: Region[key as keyof typeof Region]
  }));
};