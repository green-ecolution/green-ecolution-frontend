import { useImperativeHandle, forwardRef, useEffect } from 'react';
import FilterCheckbox from '../FilterCheckbox';
import { mapStatusToOptions, WateringStatus, WateringStatusColor } from '@/types/WateringStatus';
import useFilterOption from '@/hooks/useFilterOption';
import useUrlParams from '@/hooks/useUrlParams';

export type WateringStatusRef = {
  resetOptions: () => void;
  submitOptions: () => void;
};

const WateringStatusFieldset = forwardRef<WateringStatusRef>((_, ref) => {
  const { options, handleCheckboxClick, reset, setOptions } = useFilterOption();
  const { getUrlParams, updateUrlParams, clearUrlParams } = useUrlParams();

  useEffect(() => {
    const urlParams = getUrlParams();
    const keys = urlParams.status || [];
    setOptions(mapStatusToOptions(keys));

  }, [getUrlParams, setOptions]);

  useImperativeHandle(ref, () => ({
    resetOptions() {
      clearUrlParams();
      reset();
    },
    submitOptions() {
      updateUrlParams('status', options || []);
    },
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
