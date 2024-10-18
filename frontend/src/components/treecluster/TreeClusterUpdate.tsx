import { useMutation } from '@tanstack/react-query'
import FormForTreecluster from '../general/form/FormForTreecluster'
import BackLink from '../general/links/BackLink'
import DeleteSection from './DeleteSection'
import {
  TreeCluster,
  TreeClusterUpdate as ClusterUpdate,
} from '@green-ecolution/backend-client'
import { TreeclusterSchema } from '@/schema/treeclusterSchema'
import { useInitFormQuery } from '@/hooks/form/useInitForm'
import { treeClusterIdQuery } from '@/api/queries'
import { clusterApi } from '@/api/backendApi'
import useFormStore, { FormStore } from '@/store/form/useFormStore'
import { useFormSync } from '@/hooks/form/useFormSync'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { SubmitHandler } from 'react-hook-form'
import useStore from '@/store/store'
import { Suspense } from 'react'
import LoadingInfo from '../general/error/LoadingInfo'

interface TreeClusterUpdateProps {
  clusterId: string
  onUpdateSuccess: (data: TreeCluster) => void
  onUpdateError: () => void
}

const TreeClusterUpdate = ({
  clusterId,
  onUpdateError,
  onUpdateSuccess,
}: TreeClusterUpdateProps) => {
  const navigate = useNavigate()
  const { initForm, loadedData } = useInitFormQuery<
    TreeCluster,
    TreeclusterSchema
  >(treeClusterIdQuery(clusterId), (data) => ({
    name: data.name,
    address: data.address,
    description: data.description,
    soilCondition: data.soilCondition,
    treeIds: data.trees?.map((tree) => tree.id) ?? [],
  }))

  const formStore = useFormStore((state: FormStore<TreeclusterSchema>) => ({
    form: state.form,
    reset: state.reset,
  }))

  const mapPosition = useStore((state) => ({
    lat: state.map.center[0],
    lng: state.map.center[1],
    zoom: state.map.zoom,
  }))

  const { register, setValue, handleSubmit, formState } =
    useFormSync<TreeclusterSchema>(initForm, zodResolver(TreeclusterSchema))

  const { isError, mutate } = useMutation({
    mutationFn: (body: ClusterUpdate) =>
      clusterApi.updateTreeCluster({ clusterId, body }),
    onSuccess: (data) => onUpdateSuccess(data),
    onError: () => onUpdateError(),
    throwOnError: true,
  })

  const onSubmit: SubmitHandler<TreeclusterSchema> = async (data) => {
    mutate({
      ...data,
      treeIds: formStore.form?.treeIds ?? [],
    })
  }

  const handleDeleteTreeCluster = () => {
    return clusterApi.deleteTreeCluster({
      clusterId: String(clusterId),
    })
  }

  const navigateToTreeSelect = () => {
    navigate({
      to: '/map/treecluster/select/tree',
      search: {
        lat: mapPosition.lat,
        lng: mapPosition.lng,
        zoom: mapPosition.zoom,
        clusterId: Number(clusterId),
      },
    })
  }

  const handleDeleteTree = (treeId: number) => {
    setValue(
      'treeIds',
      formStore.form?.treeIds?.filter((id) => id !== treeId) ?? []
    )
  }

  return (
      <>
        <article className="2xl:w-4/5">
          <BackLink
            label="Zurück zur Bewässerungsgruppe"
            link={{
              to: `/treecluster/$treeclusterId`,
              params: { treeclusterId: clusterId?.toString() ?? '' },
            }}
          />
          <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
            Bewässerungsgruppe {loadedData?.name} bearbeiten
          </h1>
          <p className="mb-5">
            Hier können Sie Bäume der aktuell ausgewählten Bewässerungsgruppe zuweisen oder entfernen sowie auch Name und Adresse angeben.
          </p>
        </article>

        <section className="mt-10">
          <FormForTreecluster
            register={register}
            formState={formState}
            handleSubmit={handleSubmit}
            displayError={isError}
            onSubmit={onSubmit}
            onAddTrees={navigateToTreeSelect}
            onDeleteTree={handleDeleteTree}
          />
        </section>

        <Suspense
          fallback={
            <LoadingInfo label="Die Bewässerungsgruppe wird gelöscht" />
          }
        >
          <DeleteSection
            mutationFn={handleDeleteTreeCluster}
            entityName="die Bewässerungsgruppe"
            redirectUrl={{ to: '/treecluster' }}
          />
        </Suspense>
      </>
  )
}

export default TreeClusterUpdate
