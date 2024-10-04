import React, { useRef, useState } from "react";
import axios from "axios";
import { Check, FileUp, Trash2 } from "lucide-react";
import { useAuthHeader } from "@/hooks/useAuthHeader";
import PrimaryButton from "../buttons/PrimaryButton";
import Modal from "../form/Modal";

interface FileUploadProps {
  to: string;
  fileType: string
}

const FileUpload: React.FC<FileUploadProps> = ({ to, fileType }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const authorization = useAuthHeader();
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  type Status = "select" | "done";
  const status = { select: "select", done: "done" } as const;
  const [uploadStatus, setUploadStatus] = useState<Status>(status.select);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const onChooseFile = () => {
    inputRef.current?.click();
  };

  const clearFileInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    setFile(null);
    setUploadStatus(status.select);
    setErrorMessage(null);
  };

  const handleUpload = () => {
    uploadStatus != status.done ? setIsModalOpen(true) : clearFileInput();
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    clearFileInput();
  }

  const handleConfirm = async () => {
    setIsModalOpen(false);

    try {
      if (!file) return;
      setErrorMessage(null);
      const formData = new FormData();

      formData.append("file", file);

      await axios.post(to, formData, {
        headers: {
          'Authorization': authorization,
          'Content-Type': 'multipart/form-data',
        }
      });

      setUploadStatus(status.done);
    } catch (error) {
      handleAxiosError(error);
      setUploadStatus(status.select);
    }
  };

  const handleAxiosError = (error: any) => {
    const { response, message } = error;

    if (response?.data?.error) {
      const { error: errorMessage, err: additionalMessage } = response.data;
      const fullErrorMessage = additionalMessage ? `${errorMessage}: ${additionalMessage}` : errorMessage;

      setErrorMessage('Leider ist folgender Fehler aufgetreten: ' + fullErrorMessage);
    } else if (message) {
      setErrorMessage('Leider ist folgender Fehler aufgetreten: ' + message);
    } else {
      const message = 'Leider ist ein unbekannter Fehler aufgetreten. Bitte wenden Sie sich an eine:n Systemadministrator:in.';
      setErrorMessage(message);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center">
      <input
        ref={inputRef}
        accept={fileType}
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        className={`px-4 py-3 items-center gap-4 border-2 border-dashed border-green-light rounded-xl cursor-pointer transition duration-300 focus:outline-green-dark lg:w-1/2 ${file ? 'hidden' : 'flex'}`}
        onClick={onChooseFile}
      >
        <FileUp className="text-dark-400" />
        Datei hochladen
      </button>

      <div className={`w-full items-center gap-4 text-dark-800 border border-green-light rounded-lg bg-white px-4 py-3 focus:outline-green-dark lg:w-1/2 ${file ? 'flex' : 'hidden'}`}>
        <span className="text-2xl">📄</span>
        <p className="text-base font-medium flex-1">{file?.name}</p>
        <button
          className={`${uploadStatus === status.select ? 'block' : 'hidden'} `}
          onClick={clearFileInput}
        >
          <Trash2 className="text-dark-600" />
        </button>
      </div>
      {errorMessage && (
        <div className="mt-4 text-red">
          {errorMessage}
        </div>
      )}

      <PrimaryButton
        onClick={handleUpload}
        disabled={!file}
        className="mt-10"
        label="Daten importieren" />

      {isModalOpen && (
        <Modal
          title="Soll der Import wirklich neu angestoßen werden?"
          description="Der Import kann etwas länger dauern, sodass die Website für einen Moment in den Wartungsmodus schaltet und nicht erreichbar ist."
          confirmText="Import fortfahren"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          isOpen={isModalOpen}
        />
      )}
    </div>
  );
};

export default FileUpload;
