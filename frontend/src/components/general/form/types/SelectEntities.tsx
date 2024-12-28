import React from 'react'
import { Plus } from 'lucide-react'
import SelectedCard from '../../cards/SelectedCard'

interface SelectEntitiesProps {
  onDelete: (itemId: number) => void
  entityIds: number[]
  onAdd: () => void
  label: string
  type: 'tree' | 'cluster'
}

const SelectEntities: React.FC<SelectEntitiesProps> = ({
  onDelete,
  entityIds,
  onAdd,
  label,
  type
}) => {
  return (
    <div>
      <p className="block font-semibold text-dark-800 mb-2.5">
        Zugehörige {label}
      </p>

      <ul className="space-y-3">
        {entityIds.length === 0 ? (
          <li className="text-dark-600 font-semibold text-sm">
            <p>Hier können Sie zugehörige {label} verlinken.</p>
          </li>
        ) : (
          entityIds.map((entityId, key) => (
            <li key={key}>
              <SelectedCard type={type} id={entityId} onClick={onDelete} />
            </li>
          ))
        )}
      </ul>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          onAdd()
        }}
        className="mt-6 w-fit border border-green-light text-dark-800 px-5 py-2 group flex gap-x-3 rounded-xl items-center transition-all ease-in-out duration-300 hover:border-green-dark hover:text-dark"
      >
        <span className="font-medium">{label} hinzufügen</span>
        <Plus className="text-current" />
      </button>
    </div>
  )
}

export default SelectEntities
