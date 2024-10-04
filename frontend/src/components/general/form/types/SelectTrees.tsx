import { useNavigate } from "@tanstack/react-router";
import useStore from "@/store/store";
import React from "react";
import { Plus } from "lucide-react";
import SelectedCard from "../../cards/SelectedCard";

interface SelectTreesProps {
  onDelete: (itemId: number) => void;
}

const SelectTrees: React.FC<SelectTreesProps> = ({ onDelete }) => {
  const navigate = useNavigate({ from: "/treecluster/new" });
  const { treeIds } = useStore((state) => ({
    treeIds: state.form.treecluster.treeIds,
    cache: state.form.treecluster.cache,
  }));
  const mapPosition = useStore((state) => ({
    lat: state.map.center[0],
    lng: state.map.center[1],
    zoom: state.map.zoom,
  }));

  const handleClickAddTrees = () => {
    navigate({
      to: "/map/treecluster/select/tree",
      search: {
        lat: mapPosition.lat,
        lng: mapPosition.lng,
        zoom: mapPosition.zoom,
      },
    });
  };

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
                treeIds={treeIds}
                itemId={treeId}
                onClick={onDelete}
              />
            </li>
          ))
        )}
      </ul>

      <button
        onClick={() => handleClickAddTrees()}
        className="mt-6 w-fit border border-green-light text-dark-800 px-5 py-2 group flex gap-x-3 rounded-xl items-center transition-all ease-in-out duration-300 hover:border-green-dark hover:text-dark"
      >
        <span className="font-medium">Bäume hinzufügen</span>
        <Plus className="text-current" />
      </button>
    </div>
  );
};

export default SelectTrees;
