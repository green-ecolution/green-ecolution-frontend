import { TreeForm, TreeSchema } from "@/schema/treeSchema"
import FormForTree from "../general/form/FormForTree"
import BackLink from "../general/links/BackLink"
import DeleteSection from "../treecluster/DeleteSection"
import { useMutation, useSuspenseQuery } from "@tanstack/react-query"
import { Tree, TreeUpdate as TreeUpdateReq } from "@green-ecolution/backend-client"
import { useInitFormQuery } from "@/hooks/form/useInitForm"
import { sensorQuery, treeClusterQuery, treeIdQuery } from "@/api/queries"
import { treeApi } from "@/api/backendApi"
import { useMapStore } from "@/store/store"
import { useNavigate } from "@tanstack/react-router"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFormSync } from "@/hooks/form/useFormSync"

interface TreeUpdateProps {
  treeId: string
  onUpdateError: (err: Error) => void
  onUpdateSuccess: (data: Tree) => void
}

const TreeUpdate = ({ treeId, onUpdateSuccess, onUpdateError }: TreeUpdateProps) => {
  const navigate = useNavigate()
  const { data: sensors } = useSuspenseQuery(sensorQuery())
  const { data: treeClusters } = useSuspenseQuery(treeClusterQuery())
  const map = useMapStore()
  const { initForm, loadedData } = useInitFormQuery<Tree, TreeForm>(
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

  const { register, handleSubmit, formState } = useFormSync<TreeForm>(
    initForm,
    zodResolver(TreeSchema(initForm?.latitude ?? 0, initForm?.longitude ?? 0))
  )

  const { isError, mutate } = useMutation({
    mutationFn: (tree: TreeUpdateReq) =>
      treeApi.updateTree({
        treeId: treeId,
        body: tree,
      }),
    onSuccess: onUpdateSuccess,
    onError: onUpdateError,
  })


  const onSubmit = (data: TreeForm) => {
    mutate({
      ...data,
      description: data.description ?? '',
      sensorId: data.sensorId && (data.sensorId === '-1' || data.sensorId <= 0) ? undefined : data.sensorId,
      treeClusterId:
        data.treeClusterId && (data.treeClusterId === '-1' || data.treeClusterId <= 0) ? undefined : data.treeClusterId,
      readonly: false,
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
        link={{ to: '/tree/$treeId', params: { treeId } }}
        label="Zurück zur Übersicht"
      />
      <article className="2xl:w-4/5">
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Baum {loadedData.treeNumber} bearbeiten
        </h1>
        <p className="mb-5">
          In dieser Ansicht können Sie einem Baum bearbeiten.
        </p>
      </article>

      <section className="mt-10">
        <FormForTree
          register={register}
          handleSubmit={handleSubmit}
          displayError={isError}
          formState={formState}
          onSubmit={onSubmit}
          treeClusters={treeClusters.data}
          sensors={sensors.data}
          onChangeLocation={handleOnChangeLocation}
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
