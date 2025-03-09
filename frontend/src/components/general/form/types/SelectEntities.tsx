import React from 'react'
import { Plus } from 'lucide-react'
import SelectedCard from '../../cards/SelectedCard'

interface SelectEntitiesProps {
  onDelete: (itemId: number) => void
  entityIds: number[]
  onAdd: () => void
  label: string
  type: 'tree' | 'cluster'
  required?: boolean
  isDisabled: boolean
}

const SelectEntities: React.FC<SelectEntitiesProps> = ({
  onDelete,
  entityIds,
  onAdd,
  label,
  type,
  required = false,
  isDisabled = false
}) => {
  return (
    <div>
      <p className="block font-semibold text-dark-800 mb-2.5">
        Zugehörige {label}
        {required && <span className="text-red">&nbsp;*</span>}
      </p>

      <ul className="space-y-3">
        {entityIds.length === 0 ? (
          <li className="text-dark-600 font-semibold text-sm">
            {required ? (
              <p className="text-red">
                Es muss mindestens eine Auswahl getroffen werden.
              </p>
            ) : (
              <p>Hier können Sie zugehörige {label} verlinken.</p>
            )}
          </li>
        ) : (
          entityIds.map((entityId, key) => (
            <li key={key}>
              <SelectedCard type={type} id={entityId} onClick={onDelete} />
            </li>
          ))
        )}
      </ul>

      {isDisabled && (
        <p className="text-red mt-2 font-semibold text-sm">
          Bitte wählen Sie zuerst ein Fahrzeug aus.
        </p>
      )}

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          if (!isDisabled) {
            onAdd()
          }
        }}
        disabled={isDisabled}
        className={`mt-6 w-fit border border-green-light text-dark-800 px-5 py-2 group flex gap-x-3 rounded-xl items-center transition-all ease-in-out duration-300 ${
          isDisabled
            ? 'cursor-not-allowed opacity-50'
            : 'hover:border-green-dark hover:text-dark'
        }`}
      >
        <span className="font-medium">{label} hinzufügen</span>
        <Plus className="text-current" />
      </button>
    </div>
  )
}

export default SelectEntities
