const VoltageQualityProperties = {
  Good: {
    color: 'green-light',
    description: 'Die Spannung ist im optimalen Bereich (4.2 V bis 3.7 V).',
  },
  Moderate: {
    color: 'yellow',
    description: 'Die Spannung ist im akzeptablen Bereich (3.7 V bis 3.3 V).',
  },
  Bad: {
    color: 'red',
    description:
      'Die Spannung ist kritisch niedrig. Unter 3.0 V kann die Batterie dauerhaft beschädigt werden.',
  },
  Unknown: {
    color: 'dark-400',
    description: 'Es konnten keine Daten gefunden werden.',
  },
} as const

type VoltageQualityDetails = {
  label: string
  color: string
  description: string
}

// TODO: Check real battery values
export const getVoltageQualityDetails = (
  voltage: number | null
): VoltageQualityDetails => {
  const getQuality = (): keyof typeof VoltageQualityProperties => {
    if (voltage === null) return 'Unknown'
    if (voltage >= 3.7 && voltage <= 4.2) return 'Good'
    if (voltage >= 3.3 && voltage < 3.7) return 'Moderate'
    return 'Bad'
  }

  const quality = getQuality()

  return {
    label: voltage !== null ? `${voltage.toFixed(2)} V` : 'Keine Angabe',
    ...VoltageQualityProperties[quality],
  }
}
