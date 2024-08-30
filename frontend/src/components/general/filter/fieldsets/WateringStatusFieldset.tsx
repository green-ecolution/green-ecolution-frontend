import { useEffect } from 'react';
import FilterCheckbox from "../FilterCheckbox";
import { WateringStatus, WateringStatusColor } from "@/types/WateringStatus";
import useFilterCheckbox from '@/hooks/useFilterCheckbox';


interface WateringStatusFieldsetProps {
  onStatusChange: (status: {name: string, key:string}[]) => void;
}

function WateringStatusFieldset({ onStatusChange }: WateringStatusFieldsetProps) {
  const { options, handleCheckboxClick } = useFilterCheckbox();

  useEffect(() => {
    onStatusChange(options);
  }, [options, onStatusChange]);

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
              onClick={() => handleCheckboxClick(statusValue, statusKey)}
              name={statusKey}
            >
              <div className={`bg-${WateringStatusColor[statusValue].color} w-4 h-4 rounded-full`} />
            </FilterCheckbox>
          );
        })}
    </fieldset>
  );
}

export default WateringStatusFieldset;
