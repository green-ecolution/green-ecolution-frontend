import React from "react";
import { Plus } from "lucide-react";
import SelectedCard from "../../cards/SelectedCard";

interface SelectTreesProps {
  onDelete: (itemId: number) => void;
  treeIds: number[];
  onAddTrees: () => void;
}

const SelectTrees: React.FC<SelectTreesProps> = ({
  onDelete,
  treeIds,
  onAddTrees,
}) => {
  return (
    <div>
      <p className="block font-semibold text-dark-800 mb-2.5">
        Zugehörige Bäume <span className="text-red">*</span>
      </p>

      <ul className="space-y-3">
        {treeIds.length === 0 ? (
          <li className="text-red">
            <p>Bitte wählen Sie mindestens einen Baum aus.</p>
          </li>
        ) : (
          treeIds.map((treeId, key) => (
            <li key={key}>
              <SelectedCard
                areTreesSelected={treeIds.length > 0}
                itemId={treeId}
                onClick={onDelete}
              />
            </li>
          ))
        )}
      </ul>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onAddTrees();
        }}
        className="mt-6 w-fit border border-green-light text-dark-800 px-5 py-2 group flex gap-x-3 rounded-xl items-center transition-all ease-in-out duration-300 hover:border-green-dark hover:text-dark"
      >
        <span className="font-medium">Bäume hinzufügen</span>
        <Plus className="text-current" />
      </button>
    </div>
  );
};

export default SelectTrees;
