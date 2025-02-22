import { treeClusterIdQuery } from "@/api/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import React from "react";
import TreeclusterCardSmall from "./TreeclusterCardSmall";

interface SelectedCard {
  clusterId: number;
  onClick: (treeId: number) => void;
}

const SelectedCard: React.FC<SelectedCard> = ({ onClick, clusterId }) => {
  const { data: cluster } = useSuspenseQuery(treeClusterIdQuery(String(clusterId)))

  return (
    <div className="flex justify-between mb-3 gap-x-6 bg-white border border-dark-50 shadow-cards px-4 py-3 rounded-lg">
      <TreeclusterCardSmall
        name={cluster.name}
        id={cluster.id}
        status={cluster.wateringStatus}
      />
      <button
        type="button"
        onClick={() => {
          onClick(clusterId);
        }}
        className="text-dark-600"
      >
        <Trash2 className="w-5 h-5" />
        <span className="sr-only">Bewässerungsgruppe aus Auswahl löschen</span>
      </button>
    </div>
  );
};

export default SelectedCard;
