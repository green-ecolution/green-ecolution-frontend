import { MoveRight } from "lucide-react";
import React from "react";
import PrimaryButton from "../buttons/PrimaryButton";

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
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 bg-dark-900 bg-opacity-75 z-40"></div>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-90 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-xl font-semibold mb-4 text-left">{title}</h2>
          <p className="mb-6 text-left text-gray-600">
            {description}
          </p>
          <div className="flex justify-between items-center mt-6">
            <PrimaryButton
              onClick={onConfirm}
              icon={<MoveRight className="transition-all ease-in-out duration-300 group-hover:translate-x-2" />}
              label={confirmText}
            />
            <button
              className="flex items-center rounded-md text-gray-500 bg-transparent hover:bg-gray-500 px-4 py-2"
              onClick={onCancel}
            >
              Abbrechen
              <span className="ml-2 text-xl">✕</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
