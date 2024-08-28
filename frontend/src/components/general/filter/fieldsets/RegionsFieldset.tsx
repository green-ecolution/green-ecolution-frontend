import { Region } from "@/types/Region";
import FilterCheckbox from "../FilterCheckbox";
import { useEffect, useState } from "react";
interface RegionsFieldsetProps {
  onRegionsChange: (status: string[]) => void;
}

function RegionsFieldset({ onRegionsChange }: RegionsFieldsetProps) {
  const [filteredRegions, setFilteredRegions] = useState<string[]>([]);

  const handleCheckboxClick = (name: string) => {
    setFilteredRegions((prevRegions) => {
      if (prevRegions.includes(name)) {
        return prevRegions.filter((status) => status !== name);
      } else {
        return [...prevRegions, name];
      }
    });
  };

  useEffect(() => {
    onRegionsChange(filteredRegions);
  }, [filteredRegions, onRegionsChange]);

  return (
    <fieldset className="mb-5">
      <legend className="font-lato font-semibold text-dark-600 mb-2">
        Regionen in Flensburg
      </legend>
      {Object.entries(Region).map(([regionKey, regionsValue]) => (
        <FilterCheckbox 
          key={regionKey}
          label={regionsValue}
          onClick={() => handleCheckboxClick(regionsValue)}
          name={regionKey} />
      ))}
    </fieldset>
  );
}

export default RegionsFieldset;
