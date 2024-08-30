import { useImperativeHandle, forwardRef } from 'react';
import FilterCheckbox from '../FilterCheckbox';
import { mapKeysToOptions, Region } from '@/types/Region';
import useFilterOption from '@/hooks/useFilterOption';

export type RegionsRef = {
  resetOptions: () => void;
  setOptions: (keys: string[]) => void;
  getOptions: () => { name: string; key: string }[];
};

const RegionsFieldset = forwardRef<RegionsRef>((_, ref) => {
  const { options, handleCheckboxClick, reset, setOptions } = useFilterOption();

  useImperativeHandle(ref, () => ({
    resetOptions() {
      reset();
    },
    setOptions(keys) {
      setOptions(mapKeysToOptions(keys));
    },
    getOptions() {
      return options || [];
    }
  }));

  return (
    <fieldset className="mb-5">
      <legend className="font-lato font-semibold text-dark-600 mb-2">
        Regionen in Flensburg
      </legend>
      {Object.entries(Region).map(([regionKey, regionValue]) => (
        <FilterCheckbox
          key={regionKey}
          label={regionValue}
          onClick={() => handleCheckboxClick(regionValue, regionKey)}
          name={regionKey}
          isChecked={options.map(option => option.key).includes(regionKey)}
        />
      ))}
    </fieldset>
  );
});

export default RegionsFieldset;
