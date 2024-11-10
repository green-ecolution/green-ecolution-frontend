import BackLink from '../general/links/BackLink'
import { Tree } from '@green-ecolution/backend-client'
import { useInitFormQuery } from '@/hooks/form/useInitForm'
import { TreeForm } from '@/schema/treeSchema'
import { treeIdQuery } from '@/api/queries'
import ImageUpload from '@/components/general/form/types/ImageUpload'

interface TreeUpdateProps {
  treeId: string
  onUpdateError: (err: Error) => void
  onUpdateSuccess: (data: Tree) => void
}

const ReadonlyTreeUpdate = ({ treeId }: TreeUpdateProps) => {
  const { loadedData } = useInitFormQuery<Tree, TreeForm>(
    treeIdQuery(treeId),
    (data) => ({
      latitude: data.latitude,
      longitude: data.longitude,
      treeNumber: data.treeNumber,
      species: data.species,
      plantingYear: data.plantingYear,
      treeClusterId: data.treeClusterId ?? -1,
      sensorId: data.sensor?.id ?? -1,
      description: data.description,
    })
  )

  const handleImageUpload = (files: File[]) => {
    files.forEach((file) => {
      console.log('Uploading file:', file)
    })
  }

  return (
    <>
      <BackLink
        link={{ to: '/tree/$treeId', params: { treeId } }}
        label="Zurück zur Übersicht"
      />
      <article className="2xl:w-4/5">
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Baum {loadedData.treeNumber} bearbeiten
        </h1>
        <p className="mb-5">
          Viele Baumdaten sind nicht bearbeitbar, da diese aus dem Baumkataster
          gezogen werden. Falls diese Daten geändert werden müssen, muss das
          Baumkataster bearbeitet werden. Die Änderungen werden in dem Zuge
          übernommen.
        </p>
      </article>

      <section className="mt-10">
        <ImageUpload onUpload={handleImageUpload} />
      </section>
    </>
  )
}

export default ReadonlyTreeUpdate
