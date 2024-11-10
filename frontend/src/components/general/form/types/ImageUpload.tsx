import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface ImageUploadProps {
  onUpload: (files: File[]) => void;
  existingImages?: string[];
}

const ImageUpload = ({ onUpload, existingImages = [] }: ImageUploadProps) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      setSelectedImages((prevImages) => [...prevImages, ...files]);
      const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
      const newFileNames = files.map((file) => file.name);
      setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);
      setFileNames((prevNames) => [...prevNames, ...newFileNames]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
    setFileNames((prevNames) => prevNames.filter((_, i) => i !== index));
  };

  const handleUploadClick = () => {
    if (selectedImages.length > 0) {
      onUpload(selectedImages);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('fileInput')?.click();
  };

  return (
    <div>
      <h2>Image Upload</h2>

      {previewUrls.length > 0 && (
        <div>
          <p>Preview:</p>
          <ul className="space-y-3">
            {previewUrls.map((url, index) => (
              <li key={index} className="flex items-center gap-4 border-b border-gray-300 pb-3 mb-3">
                <img
                  src={url}
                  alt={`Preview ${index}`}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <span>{fileNames[index]}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="text-red-500 hover:text-red-700 transition duration-200"
                  aria-label="Remove image"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="fileInput"
      />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          triggerFileInput();
        }}
        className="mt-6 w-fit border border-green-light text-dark-800 px-5 py-2 group flex gap-x-3 rounded-xl items-center transition-all ease-in-out duration-300 hover:border-green-dark hover:text-dark"
      >
        <span className="font-medium">Select Images</span>
        <Plus className="text-current" />
      </button>

      <button onClick={handleUploadClick} disabled={selectedImages.length === 0}>
        Upload
      </button>
      {existingImages.length > 0 && (
        <div>
          <p>Existing Images:</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {existingImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Existing ${index}`}
                className="w-16 h-16 rounded-lg object-cover"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
