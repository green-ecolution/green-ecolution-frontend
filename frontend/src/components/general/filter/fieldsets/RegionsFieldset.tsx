import { Region } from "@/types/Region";
import FilterCheckbox from "../FilterCheckbox";
import { useEffect } from "react";
import useFilterCheckbox from "@/hooks/useFilterCheckbox";

interface RegionsFieldsetProps {
  onRegionsChange: (status: {name: string, key:string}[]) => void;
}

function RegionsFieldset({ onRegionsChange }: RegionsFieldsetProps) {
  const { options, handleCheckboxClick } = useFilterCheckbox();

  useEffect(() => {
    onRegionsChange(options);
  }, [options, onRegionsChange]);

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
          name={regionKey} />
      ))}
    </fieldset>
  );
}

export default RegionsFieldset;
