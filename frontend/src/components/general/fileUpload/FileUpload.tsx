import React, { useEffect, useRef } from "react";
import { Trash2 } from "lucide-react";

interface FileUploadProps {
  fileType: string;
  name: string;
  message?: string;
  showDeleteButton: boolean;
  clearFileInput: () => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  fileType,
  name = "file",
  message = "",
  handleFileChange,
  clearFileInput,
  showDeleteButton,
}) => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleClearInput = () => {
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
    clearFileInput();
  };

  useEffect(() => {
    if (message && inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  }, [message]);

  return (
    <>
      <div className="flex items-center gap-x-4">
        <input
          ref={inputFileRef}
          accept={fileType}
          id={name}
          type="file"
          onChange={handleFileChange}
          className="w-full items-center gap-4 text-dark-800 border border-green-light rounded-lg bg-white px-4 py-3 focus:outline-green-dark lg:w-1/2"
        />

        <button
          type="button"
          className={`${showDeleteButton ? 'block' : 'hidden'} `}
          onClick={handleClearInput}
        >
          <Trash2 className="text-dark-600" />
          <span className="sr-only">Datei unselektieren</span>
        </button>
      </div>

      {message && (
        <div className="mt-4 text-red">
          {message}
        </div>
      )}
    </>
  );
};

export default FileUpload;
