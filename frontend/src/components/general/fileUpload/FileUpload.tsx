import React, { useRef, useState } from "react";
import axios from "axios";
import { Check, MoveLeft, MoveRight, Trash2 } from "lucide-react";
import { useAuthHeader } from "@/hooks/useAuthHeader";


interface FileUploadProps  {
     to : string;
     fileType: string
  }

const FileUpload: React.FC<FileUploadProps> = ({to, fileType}) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const authHeader = useAuthHeader();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [progress, setProgress] = useState<number>(0);

    type Status = "select" | "uploading" | "done";
    const status = { select: "select", uploading: "uploading", done: "done" } as const;
    const [uploadStatus, setUploadStatus] = useState<Status>(status.select);


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const onChooseFile = () => {
        inputRef.current?.click();
    };

    const clearFileInput = () => {
        if (inputRef.current) {
            inputRef.current.value = "";
        }
        setSelectedFile(null);
        setProgress(0);
        setUploadStatus(status.select);
    };

    const handleUpload = async () => {
        if (uploadStatus === status.done) {
            clearFileInput();
            return;
        }

        try {
            setUploadStatus(status.uploading);

            const formData = new FormData();
            if (selectedFile) {
                formData.append("file", selectedFile);
            }

            const response = await axios.post(to, formData, {
                headers: {
                    'Authorization': authHeader,
                    'Content-Type': 'multipart/form-data',
                }, onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setProgress(percentCompleted);
                    }
                }
            });
           

            setUploadStatus(status.done);
        } catch (error) {
            setUploadStatus(status.select);
        }
    };

    return (
        <div className="w-full flex flex-col  justify-center">
            <input
                ref={inputRef}
                accept={fileType}
                type="file"
                onChange={handleFileChange}
                className="hidden"
            />

            {/* Button to trigger the file input dialog */}
            {!selectedFile && (
                <button
                    className="w-80 h-36 text-lg font-medium flex flex-col items-center justify-center gap-4 text-indigo-600 bg-black border-2 border-dashed border-indigo-600 rounded-xl cursor-pointer transition duration-300 hover:bg-gray-100"
                    onClick={onChooseFile}
                >
                    <span className="w-12 h-12 text-4xl text-indigo-600 flex items-center justify-center rounded-full bg-indigo-50">
                        ⬆️
                    </span>
                    Datei hochladen
                </button>
            )}

            {selectedFile && (
                <>
                    <div className="w-72 p-4 bg-black rounded-lg flex items-center gap-4 border border-indigo-300">
                        <span className="text-indigo-600 text-2xl">📄</span>

                        <div className="flex-1">
                            <p className="text-sm font-medium">{selectedFile?.name}</p>

                            <div className="w-full h-1.5 bg-gray-200 rounded mt-2">
                                <div
                                    className="h-1.5 bg-indigo-600 rounded"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        {uploadStatus === status.select ? (
                            <button
                                className="w-9 h-9 text-indigo-600 bg-indigo-50 rounded-full flex items-center justify-center"
                                onClick={clearFileInput}
                            >
                                <Trash2 />
                            </button>
                        ) : (
                            <div className="w-9 h-9 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                                {uploadStatus === "uploading" ? (
                                    `${progress}%`
                                ) : uploadStatus === status.done ? (
                                    <button
                                    className="w-9 h-9 text-indigo-600 bg-indigo-50 rounded-full flex items-center justify-center"
                                    onClick={clearFileInput}
                                >
                                    <Check />
                                </button>
                                ) : null}
                            </div>
                        )}
                    </div>
                    <br />
                    <button onClick={handleUpload} className="w-72 p-4 bg-green-dark text-white px-5 py-2 group inline-flex gap-x-3 
        rounded-xl items-center transition-all ease-in-out duration-300 hover:bg-green-light">
                        <span className="font-medium">
                            {uploadStatus === status.done ? "erneut selektieren" : "Daten importieren"}
                        </span>
                        {uploadStatus === status.done ? (
                            <MoveLeft className="transition-all ease-in-out duration-300 group-hover:translate-x-2" />
                        ) : (
                            <MoveRight className="transition-all ease-in-out duration-300 group-hover:translate-x-2" />
                        )}

                    </button>
                </>
            )}
        </div>
    );
};

export default FileUpload;
