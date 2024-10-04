import { createFileRoute } from '@tanstack/react-router'
import FileUpload from '@/components/general/fileUpload/FileUpload';
import GeneralStatusCard from '@/components/general/cards/GeneralStatusCard';

export const Route = createFileRoute('/_protected/settings/import')({
  component: ImportFile,
})

function ImportFile() {
  const url = '/api-local/v1/import/csv'
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
          Kataster neu importieren
        </h1>
        <p>
          Qui voluptate dolore amet sunt elit dolor in anim consequat
          laborum ipsum est adipisicing Lorem fugiat. Reprehenderit
          duis velit adipisicing incididunt veniam reprehenderit sit
          id sunt. Ut magna dolore nulla reprehenderit culpa anim tempor.
          Mollit laborum officia commodo mollit dolor deserunt qui occaecat anim.
        </p>
      </article>
      <br />
      <ul className="grid grid-cols-1 gap-5 mt-10 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, key) => (
          <li key={key}>
            <GeneralStatusCard overline={card.headline} value={card.value} description={card.description} />
          </li>
        ))}
      </ul>

      {/* File input section */}
      <div className="my-6">

        <h3 className="font-semibold text-lg text-gray-900 mb-4">Import neu anstoßen:</h3>

        <label className="block text-sm font-medium text-gray-700 mb-2">
          CSV-Datei mit aktuellen Bäumen:
        </label>
        <FileUpload to={url} fileType='.csv'/>
      </div>
    </div>
  );
}
