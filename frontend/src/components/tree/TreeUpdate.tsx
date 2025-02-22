import { TreeForm, TreeSchema } from '@/schema/treeSchema'
import FormForTree from '../general/form/FormForTree'
import BackLink from '../general/links/BackLink'
import DeleteSection from '../treecluster/DeleteSection'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Tree } from '@green-ecolution/backend-client'
import { useInitFormQuery } from '@/hooks/form/useInitForm'
import { sensorQuery, treeClusterQuery, treeIdQuery } from '@/api/queries'
import { treeApi } from '@/api/backendApi'
import { useMapStore } from '@/store/store'
import { useNavigate } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFormSync } from '@/hooks/form/useFormSync'
import { useTreeForm } from '@/hooks/form/useTreeForm'

interface TreeUpdateProps {
  treeId: string
}

const TreeUpdate = ({ treeId }: TreeUpdateProps) => {
  const navigate = useNavigate()
  const map = useMapStore()
  const { mutate, isError, error } = useTreeForm('update', treeId)
  const { data: sensors } = useSuspenseQuery(sensorQuery())
  const { data: treeClusters } = useSuspenseQuery(treeClusterQuery())
  const { initForm, loadedData } = useInitFormQuery<Tree, TreeForm>(
    treeIdQuery(treeId),
    (data) => ({
      latitude: data.latitude,
      longitude: data.longitude,
      number: data.number,
      species: data.species,
      plantingYear: data.plantingYear,
      treeClusterId: data.treeClusterId ?? -1,
      sensorId: data.sensor?.id ?? '-1',
      description: data.description,
      provider: data.provider,
    })
  )

  const { register, handleSubmit, formState } = useFormSync<TreeForm>(
    initForm,
    zodResolver(TreeSchema(initForm?.latitude ?? 0, initForm?.longitude ?? 0))
  )

  const onSubmit = (data: TreeForm) => {
    mutate({
      ...data,
      sensorId:
        data.sensorId && data.sensorId === '-1' ? undefined : data.sensorId,
      treeClusterId:
        data.treeClusterId &&
        (data.treeClusterId === '-1' || data.treeClusterId <= 0)
          ? undefined
          : data.treeClusterId,
    })
  }

  const handleDeleteTree = () => {
    return treeApi.deleteTree({
      treeId: String(treeId),
    })
  }

  const handleOnChangeLocation = () => {
    navigate({
      to: '/map/tree/edit',
      search: {
        treeId: Number(treeId),
        lat: initForm?.latitude ?? 0,
        lng: initForm?.longitude ?? 0,
        zoom: map.zoom,
      },
    })
  }

  return (
    <>
      <BackLink
        link={{ to: '/trees/$treeId', params: { treeId } }}
        label="Zurück zur Übersicht"
      />
      <article className="2xl:w-4/5">
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Baum {loadedData.number} bearbeiten
        </h1>
        <p className="mb-5">
          In dieser Ansicht können Sie einem Baum bearbeiten.
        </p>
      </article>

      <section className="mt-10">
        <FormForTree
          isReadonly={!!initForm?.provider}
          register={register}
          handleSubmit={handleSubmit}
          displayError={isError}
          formState={formState}
          onSubmit={onSubmit}
          treeClusters={treeClusters.data}
          sensors={sensors.data}
          onChangeLocation={handleOnChangeLocation}
          errorMessage={error?.message}
        />
      </section>

      <DeleteSection
        mutationFn={handleDeleteTree}
        entityName="der Baum"
        redirectUrl={{ to: '/map' }}
      />
    </>
  )
}

export default TreeUpdate
