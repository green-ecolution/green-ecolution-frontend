import { createFileRoute } from '@tanstack/react-router'
import GeneralStatusCard from '@/components/general/cards/GeneralStatusCard'
import PrimaryButton from '@/components/general/buttons/PrimaryButton'
import { useState } from 'react'
import FileUpload from '@/components/general/form/types/FileUpload'
import Modal from '@/components/general/Modal'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { treeQuery } from '@/api/queries'
import { importApi } from '@/api/backendApi'
import useToast from '@/hooks/useToast'

export const Route = createFileRoute('/_protected/settings/import')({
  component: ImportFile,
  meta: () => [{ title: 'Bäume importieren' }],
})

function ImportFile() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [message, setMessage] = useState('')
  const { data: trees } = useSuspenseQuery(treeQuery())
  const queryClient = useQueryClient()
  const showToast = useToast()

  const { mutate } = useMutation({
    mutationFn: (file: File) =>
      importApi.importTreesFromCsv({ file }),
    onSuccess: () => {
      queryClient.invalidateQueries(treeQuery())
      setMessage('Die Bäume wurden erfolgreich importiert.')
      showToast('Die Bäume wurden erfolgreich importiert.')
    },
    onError: (error) => {
      console.error(error)
      setMessage('Es ist ein Fehler beim Importieren aufgetreten.')
    },
  })

  const getReadonlyTreesLength = () => {
    const readonlyTrees = trees.data.filter((tree) => tree.readonly)
    return readonlyTrees.length
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    if (event.target.files.length === 0) setFile(null)

    const file = event.target.files[0]
    if (file.type !== 'text/csv' && file.type !== 'application/vnd.ms-excel') {
      setMessage('Es sind nur CSV-Dateien erlaubt.')
      return
    }

    setFile(event.target.files[0])
  }

  const handleConfirm = async () => {
    setIsModalOpen(false)
    file && mutate(file)
  }

  // TODO: use real date of import
  const cards = [
    {
      headline: 'Anzahl der importierten Bäume',
      value: `${getReadonlyTreesLength()} Bäume`,
      description:
        'Diese Bäume wurden aus einer CSV-Datei importiert und nicht manuell im System eingepflegt.',
    },
    {
      headline: 'Anzahl der manuell eingepflegten Bäume',
      value: `${trees.data.length - getReadonlyTreesLength()} Bäume`,
      description: 'Diese Bäume wurden manuell im System eingepflegt.',
    },
    {
      headline: 'Datum des letzten Imports',
      value: '20.05.2024',
      description:
        'Am 20.05.2024 wurde das letzte Mal ein Import von Bäumen anhand einer CSV-Datei ausgeführt.',
    },
  ]

  return (
    <div className="container mt-6">
      <article className="2xl:w-4/5">
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Kataster neu importieren
        </h1>
        <p>
          Diese Funktion erlaubt Ihnen, das Baumkataster zu importieren.
        </p>
      </article>

      <ul className="grid grid-cols-1 gap-5 mt-10 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, key) => (
          <li key={key}>
            <GeneralStatusCard
              overline={card.headline}
              value={card.value}
              description={card.description}
            />
          </li>
        ))}
      </ul>

      <div className="mt-16">
        <h2 className="text-xl font-bold font-lato mb-4">
          Import anstoßen:
        </h2>
        <p className="block text-base text-dark-700 mb-2">
          CSV-Datei mit aktuellen Bäumen:
        </p>
        <form className="w-full flex flex-col justify-center">
          <FileUpload
            name="import_file"
            fileType=".csv"
            message={message}
            handleFileChange={handleFileChange}
            showDeleteButton={file !== null}
            clearFileInput={() => setFile(null)}
          />
        </form>

        <PrimaryButton
          onClick={() => setIsModalOpen(true)}
          disabled={!file}
          className="mt-10"
          label="Daten importieren"
        />

        <Modal
          title="Soll der Import wirklich neu angestoßen werden?"
          description="Der Import kann etwas länger dauern, sodass die Website für einen Moment in den Wartungsmodus schaltet und nicht erreichbar ist."
          confirmText="Import fortfahren"
          onConfirm={handleConfirm}
          onCancel={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
        />
      </div>
    </div>
  )
}
