type ActionType = 'delete' | 'create' | 'update';

const labels = {
  treecluster: {
    delete: 'Die Bewässerungsgruppe wurde erfolgreich gelöscht.',
    create: 'Die Bewässerungsgruppe wurde erfolgreich erstellt.',
    update: 'Die Bewässerungsgruppe wurde erfolgreich editiert.',
  },
} as const;

type LabelCategory = keyof typeof labels;

export const getToastLabel = <C extends LabelCategory>(category: C, action: ActionType): string => {
  return labels[category][action];
};
