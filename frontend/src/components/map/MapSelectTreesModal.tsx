import React, { useState } from "react";
import PrimaryButton from "../general/buttons/PrimaryButton";
import SecondaryButton from "../general/buttons/SecondaryButton";
import { MoveRight, X } from "lucide-react";

interface MapSelectTreesModalProps {
  onSave: () => void;
  onCancel: () => void;
  treeIds?: number[];
  title?: string;
  subtitle?: string;
  content: React.ReactNode;
}

const MapSelectTreesModal = ({
  onSave,
  onCancel,
  content,
  title,
}: MapSelectTreesModalProps) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="text-base font-nunito-sans">
      <button
        onClick={() => setOpenModal(true)}
        className={`bg-white absolute flex items-center group gap-x-3 rounded-xl px-5 py-2 z-[1000] left-4 bottom-6 transition-all ease-in-out duration-300 hover:bg-dark-100 lg:hidden
          ${openModal ? "hidden" : ""}`}
      >
        <span className="font-medium text-base">Auswahl anzeigen</span>
        <MoveRight className="transition-all ease-in-out duration-300 group-hover:translate-x-2" />
      </button>

      <div
        role="dialog"
        aria-modal="true"
        className={`space-y-6 absolute z-[1000] top-4 inset-x-4 lg:w-[30rem] lg:left-auto lg:right-10 bg-white border-dark-50 shadow-xl p-5 rounded-xl
          ${openModal ? "block" : "hidden lg:block"}`}
      >
        <div className="flex justify-between gap-x-6">
          <h2 className="text-lg font-lato font-semibold lg:text-xl">
            {title}
          </h2>
          <button
            aria-label="Close Dialog"
            className="text-dark-400 hover:text-dark-600 stroke-1 lg:hidden"
            onClick={() => setOpenModal(false)}
          >
            <X />
          </button>
        </div>

        {content}

        <div className="flex flex-wrap gap-5">
          <PrimaryButton type="submit" label="Speichern" onClick={onSave} />
          <SecondaryButton label="Zurück" onClick={onCancel} />
        </div>
      </div>
    </div>
  );
};

export default MapSelectTreesModal;
