import { useState, useEffect } from 'react';
import FilterCheckbox from "../FilterCheckbox";
import { WateringStatus, WateringStatusColor } from "@/types/WateringStatus";

interface StatusFieldsetProps {
  onStatusChange: (status: string[]) => void;
}

function StatusFieldset({ onStatusChange }: StatusFieldsetProps) {
  const [filteredStatus, setFilteredStatus] = useState<string[]>([]);

  const handleCheckboxClick = (name: string) => {
    setFilteredStatus((prevStatus) => {
      if (prevStatus.includes(name)) {
        return prevStatus.filter((status) => status !== name);
      } else {
        return [...prevStatus, name];
      }
    });
  };

  useEffect(() => {
    onStatusChange(filteredStatus);
  }, [filteredStatus, onStatusChange]);

  return (
    <fieldset className="mb-5">
      <legend className="font-lato font-semibold text-dark-600 mb-2">
        Status der Bewässerung
      </legend>

      {Object.entries(WateringStatus)
        .filter(([key]) => key !== 'unknown')
        .map(([statusKey, statusValue]) => {
          return (
            <FilterCheckbox
              key={statusKey}
              label={statusValue}
              onClick={() => handleCheckboxClick(statusKey)}
              name={statusKey}
            >
              <div className={`bg-${WateringStatusColor[statusValue].color} w-4 h-4 rounded-full`} />
            </FilterCheckbox>
          );
        })}
    </fieldset>
  );
}

export default StatusFieldset;
