import FilterCheckbox from "../FilterCheckbox";
import { WateringStatus, WateringStatusColor } from "@/types/WateringStatus";

function StatusFieldset() {
  return (
    <fieldset className="mb-5">
      <legend className="font-lato font-semibold text-dark-600 mb-2">
        Status der Bewässerung
      </legend>
      {Object.entries(WateringStatus).filter(([key]) => key !== 'unknown').map(([statusKey, statusValue]) => (
        <FilterCheckbox 
          key={statusKey}
          label={statusValue}
          name={`watering-${statusKey}`}
        >
          <div className={`bg-${WateringStatusColor[statusValue].color} w-4 h-4 rounded-full`} />
        </FilterCheckbox>
      ))}
    </fieldset>
  );
}

export default StatusFieldset;
