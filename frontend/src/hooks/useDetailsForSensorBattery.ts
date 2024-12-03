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
} as const;

type VoltageQualityDetails = {
  label: string; // Dynamisches Label für die aktuelle Spannung
  color: string;
  description: string;
};

export const getVoltageQualityDetails = (
  voltage: number
): VoltageQualityDetails => {
  if (voltage >= 3.7 && voltage <= 4.2) {
    return {
      label: `${voltage.toFixed(2)} V`,
      ...VoltageQualityProperties.Good,
    };
  } else if (voltage >= 3.3 && voltage < 3.7) {
    return {
      label: `${voltage.toFixed(2)} V`,
      ...VoltageQualityProperties.Moderate,
    };
  } else {
    return {
      label: `${voltage.toFixed(2)} V`,
      ...VoltageQualityProperties.Bad,
    };
  }
};
