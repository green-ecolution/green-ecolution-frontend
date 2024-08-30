import { useState } from 'react';

interface FilterObject {
  name: string;
  key: string;
}

function useFilterOption() {
  const [options, setOptions] = useState<FilterObject[]>([]);
  const reset = () => setOptions([]);

  const handleCheckboxClick = (name: string, key: string) => {
    setOptions((prevOptions) => {
      const isAlreadySelected = prevOptions.some((option) => option.key === key);
      
      if (isAlreadySelected) {
        return prevOptions.filter((option) => option.key !== key);
      } else {
        return [...prevOptions, { name, key }];
      }
    });
  };

  return {
    options,
    handleCheckboxClick,
    reset,
  };
}

export default useFilterOption;
