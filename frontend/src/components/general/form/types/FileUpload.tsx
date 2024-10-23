import React, { useEffect, useRef } from "react";
import { Trash2 } from "lucide-react";
import { MessageType, type } from "@/enum/MessageTypes";


interface FileUploadProps {
  fileType: string;
  name: string;
  message?: string;
  isFileSelected: boolean;
  clearFileInput: () => void;
  messageType : MessageType; 
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  fileType,
  name = "file",
  message = "",
  handleFileChange,
  clearFileInput,
  isFileSelected,
  messageType, 
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
          className={`${isFileSelected ? 'block' : 'hidden'} `}
          onClick={handleClearInput}
        >
          <Trash2 className="text-dark-600" />
          <span className="sr-only">Datei unselektieren</span>
        </button>
      </div>

      {message && !isFileSelected && (
        <div className={`mt-4 ${getClassNameForMessageType(messageType)}
        font-semibold text-sm`}>
          {message}
        </div>
      )}
    </>
  );
};
const getClassNameForMessageType = (messageType: MessageType) => {
  switch (messageType) {
    case type.success:
      return 'text-green-dark';
    case type.warning:
      return 'text-yellow';
    case type.error:
      return 'text-red';
    default:
      return '';
  }
};
export default FileUpload;