import { EntitiesTreeSoilCondition } from '@green-ecolution/backend-client'

export const SoilConditionOptions = [
  {
    value: EntitiesTreeSoilCondition.TreeSoilConditionSchluffig,
    label: 'Schluffig',
  },
  { value: EntitiesTreeSoilCondition.TreeSoilConditionSandig, label: 'Sandig' },
  { value: EntitiesTreeSoilCondition.TreeSoilConditionLehmig, label: 'Lehmig' },
  { value: EntitiesTreeSoilCondition.TreeSoilConditionTonig, label: 'Tonig' },
  {
    value: EntitiesTreeSoilCondition.TreeSoilConditionUnknown,
    label: 'Unbekannt',
  },
]
