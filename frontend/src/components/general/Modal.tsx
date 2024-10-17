import React from "react";
import PrimaryButton from "./buttons/PrimaryButton";
import SecondaryButton from "./buttons/SecondaryButton";

interface ModalProps {
  title: string;
  description: string;
  confirmText: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({
  title,
  description,
  confirmText,
  onConfirm,
  onCancel,
  isOpen,
}) => {
  return (
    <>
      <div onClick={onCancel} className={`bg-dark-900/90 fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}></div>
      <div
        role="dialog"
        aria-modal="true"
        className={`fixed z-[60] inset-x-4 shadow-xl bg-white top-1/2 -translate-y-1/2 p-5 rounded-xl mx-auto max-w-[30rem] ${isOpen ? 'block' : 'hidden'}`}
      >
        <h2 className="text-xl font-semibold mb-4 text-left">{title}</h2>
        <p className="mb-6 text-left text-gray-600">{description}</p>
        <div className="flex flex-wrap gap-2 items-center mt-6">
          <PrimaryButton isDanger onClick={onConfirm} label={confirmText} />
          <SecondaryButton
            label="Abbrechen"
            className="flex items-center rounded-md text-gray-500 bg-transparent hover:bg-gray-500 px-4 py-2"
            onClick={onCancel} />
        </div>
      </div>
    </>
  );
};

export default Modal;
