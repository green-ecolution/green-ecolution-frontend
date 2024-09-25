import { createFileRoute } from '@tanstack/react-router'
import InfoCard from '@/components/general/cards/InfoCard';
import { useState } from 'react';
import axios from 'axios';
import { MoveRight } from 'lucide-react';
export const Route = createFileRoute('/_protected/import')({
  component: ImportFile,
})

function ImportFile() {
  const [file, setFile] = useState<File | null>(null);



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleSubmit = async () => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    // Create FormData and append the file
    const formData = new FormData();
    formData.append('file', file); // 'file' is the key expected by the backend

    try {
      // Send the file to the backend using Axios
      const response = await axios.post('http://localhost:3000/api/v1/import_file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File successfully uploaded:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const cards = [
    {
      headline: 'Anzahl der importierten Bäume',
      value: '820 Bäume',
      description:
        'Diese Bäume wurden aus einer CSV Datei importiert und nicht im System manuell eingepflegt.',
    },
    {
      headline: 'Anzahl der manuell eingepflegten Bäume',
      value: '24 Bäume',
      description: 'Diese Bäume wurden manuell im System eingepflegt.',
    },
    {
      headline: 'Datum des letzten Imports',
      value: '20.05.2024',
      description:
        'Am 20.05.2024 wurde das letzte Mal die Bäume anhand einer CSV Datei importiert.',
    },
  ];

  return (
    <div className="container mt-6">
      <article className="2xl:w-4/5">
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Import File ...
        </h1>
        <p>
          Qui voluptate dolore amet sunt elit dolor in anim consequat
          laborum ipsum est adipisicing Lorem fugiat. Reprehenderit
          duis velit adipisicing incididunt veniam reprehenderit sit
          id sunt. Ut magna dolore nulla reprehenderit culpa anim tempor.
          Mollit laborum officia commodo mollit dolor deserunt qui occaecat anim.
        </p>
      </article>

      <h2 className="text-sm font-semibold text-dark-800 mb-4">...</h2>

      <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, key) => (
          <li key={key}>
            <InfoCard headline={card.headline} value={card.value} description={card.description} />
          </li>
        ))}
      </ul>

      {/* File input section */}
      <div className="my-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-4">Import neu anstoßen:</h3>

        <label className="block text-sm font-medium text-gray-700 mb-2">
          CSV-Datei mit aktuellen Bäumen:
        </label>

        {/* Input container */}
        <div className="relative border border-gray-300 rounded-md p-2 inline-flex items-center">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="p-2 border border-gray-400 rounded-md"
          />
          <button
            onClick={handleRemoveFile}
            className="ml-2 text-gray-500 hover:text-red-600">X</button>
        </div>

        <p className="text-sm text-gray-500 mt-2">Die Datei muss eine CSV-Datei sein.</p>

        {/*<input
          type="file"
          accept=".csv"
          id="file-upload"
          className="hidden"
          onChange={handleSubmit}
        />
        <label
          htmlFor="file-upload"
          className="bg-green-dark text-white px-5 py-2 group inline-flex gap-x-3 rounded-xl items-center transition-all ease-in-out duration-300 hover:bg-green-light"
        >
          <span className="font-medium">Daten importieren</span>
          <MoveRight className="transition-all ease-in-out duration-300 group-hover:translate-x-2" />
        </label>*/}
        <button onClick={handleSubmit} className="bg-green-dark text-white px-5 py-2 group inline-flex gap-x-3 
        rounded-xl items-center transition-all ease-in-out duration-300 hover:bg-green-light">
          <span className="font-medium">Daten importieren</span>
          <MoveRight className="transition-all ease-in-out duration-300 group-hover:translate-x-2" /></button>
      </div>
    </div>
  );
}