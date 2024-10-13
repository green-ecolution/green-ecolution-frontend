import Option from '../Option'
import { getWateringStatusDetails } from '@/hooks/useDetailsForWateringStatus'
import useFilter from '@/hooks/useFilter'
import { EntitiesWateringStatus } from '@green-ecolution/backend-client'

const StatusFieldset = () => {
  const { tempFilters, handleStatusChange } = useFilter()
  return (
    <fieldset>
      <legend className="font-lato font-semibold text-dark-600 mb-2">
        Zustand der Bewässerung:
      </legend>
      {Object.entries(EntitiesWateringStatus).map(
        ([statusKey, statusValue]) => (
          <Option
            key={statusKey}
            label={getWateringStatusDetails(statusValue).label}
            name={statusKey}
            checked={tempFilters.statusTags.includes(
              getWateringStatusDetails(statusValue).label
            )}
            onChange={handleStatusChange}
          >
            <div
              className={`bg-${getWateringStatusDetails(statusValue).color} w-4 h-4 rounded-full`}
            />
          </Option>
        )
      )}
    </fieldset>
  )
}

export default StatusFieldset
