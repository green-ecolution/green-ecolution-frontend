import { useImperativeHandle, forwardRef } from 'react';
import FilterCheckbox from '../FilterCheckbox';
import { WateringStatus, WateringStatusColor } from '@/types/WateringStatus';
import useFilterOption from '@/hooks/useFilterOption';

export type WateringStatusRef = {
  resetOptions: () => void;
  getActiveOptions: () => { name: string; key: string }[];
};

const WateringStatusFieldset = forwardRef<WateringStatusRef>((_, ref) => {
  const { options, handleCheckboxClick, reset } = useFilterOption();

  useImperativeHandle(ref, () => ({
    resetOptions() {
      reset();
    },
    getActiveOptions() {
      return options || [];
    }
  }));

  return (
    <fieldset className="mb-5">
      <legend className="font-lato font-semibold text-dark-600 mb-2">
        Status der Bewässerung
      </legend>

      {Object.entries(WateringStatus)
        .filter(([key]) => key !== 'unknown')
        .map(([statusKey, statusValue]) => (
          <FilterCheckbox
            key={statusKey}
            label={statusValue}
            onClick={() => handleCheckboxClick(statusValue, statusKey)}
            name={statusKey}
            isChecked={options.map(option => option.key).includes(statusKey)}
          >
            <div className={`bg-${WateringStatusColor[statusValue].color} w-4 h-4 rounded-full`} />
          </FilterCheckbox>
        ))}
    </fieldset>
  );
});

export default WateringStatusFieldset;
