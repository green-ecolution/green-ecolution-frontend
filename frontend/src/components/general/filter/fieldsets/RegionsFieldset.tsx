import { useImperativeHandle, forwardRef, useEffect } from 'react';
import FilterCheckbox from '../FilterCheckbox';
import { mapRegionToOptions, Region } from '@/types/Region';
import useFilterOption from '@/hooks/useFilterOption';
import useUrlParams from '@/hooks/useUrlParams';

export type RegionsRef = {
  resetOptions: () => void;
  getOptions: () => { name: string; key: string }[];
};

const RegionsFieldset = forwardRef<RegionsRef>((_, ref) => {
  const { options, handleCheckboxClick, reset, setOptions } = useFilterOption();
  const { getUrlParams } = useUrlParams();

  useEffect(() => {
    const urlParams = getUrlParams();
    const keys = urlParams.regions || [];
    setOptions(mapRegionToOptions(keys));

  }, [getUrlParams, setOptions]);

  useImperativeHandle(ref, () => ({
    resetOptions() {
      reset();
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
