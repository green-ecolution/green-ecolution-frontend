import { Region } from "@/types/Region";
import FilterCheckbox from "../FilterCheckbox";

function RegionsFieldset() {
  return (
    <fieldset className="mb-5">
      <legend className="font-lato font-semibold text-dark-600 mb-2">
        Regionen in Flensburg
      </legend>
      {Object.entries(Region).map(([statusKey, statusValue]) => (
        <FilterCheckbox 
          key={statusKey}
          label={statusValue}
          name={`watering-${statusKey}`} />
      ))}
    </fieldset>
  );
}

export default RegionsFieldset;
