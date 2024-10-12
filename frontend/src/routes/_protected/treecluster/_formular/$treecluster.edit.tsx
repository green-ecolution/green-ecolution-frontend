import { clusterApi, TreeCluster, TreeClusterUpdate } from '@/api/backendApi'
import { treeClusterIdQuery } from '@/api/queries'
import queryClient from '@/api/queryClient'
import FormForTreecluster from '@/components/general/form/FormForTreecluster'
import BackLink from '@/components/general/links/BackLink'
import DeleteSection from '@/components/treecluster/DeleteSection'
import { useFormSync } from '@/hooks/form/useFormSync'
import { useInitFormQuery } from '@/hooks/form/useInitForm'
import { useAuthHeader } from '@/hooks/useAuthHeader'
import useToast from '@/hooks/useToast'
import { TreeclusterSchema } from '@/schema/treeclusterSchema'
import useFormStore, { FormStore } from '@/store/form/useFormStore'
import useStore from '@/store/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'
import { SubmitHandler } from 'react-hook-form'

export const Route = createFileRoute(
  '/_protected/treecluster/_formular/$treecluster/edit'
)({
  component: EditTreeCluster,
  beforeLoad: () => {
    useFormStore.getState().setType('edit')
  },
  loader: ({ params: { treecluster } }) => {
    if (!useStore.getState().auth.isAuthenticated) return
    const token = useStore.getState().auth.token?.accessToken ?? ''
    return queryClient.ensureQueryData(
      treeClusterIdQuery(treecluster, `Bearer ${token}`)
    )
  },
})

function EditTreeCluster() {
  const authorization = useAuthHeader()
  const clusterId = Route.useParams().treecluster
  const navigate = useNavigate({ from: Route.fullPath })
  const showToast = useToast()
  const { initForm, loadedData } = useInitFormQuery<
    TreeCluster,
    TreeclusterSchema
  >(treeClusterIdQuery(clusterId, authorization), (data) => ({
    name: data.name,
    address: data.address,
    description: data.description,
    soilCondition: data.soilCondition,
    treeIds: data.trees.map((tree) => tree.id),
  }))

  const mapPosition = useStore((state) => ({
    lat: state.map.center[0],
    lng: state.map.center[1],
    zoom: state.map.zoom,
  }))

  const formStore = useFormStore((state: FormStore<TreeclusterSchema>) => ({
    form: state.form,
    reset: state.reset,
  }))

  const { register, setValue, handleSubmit, formState } =
    useFormSync<TreeclusterSchema>(initForm, zodResolver(TreeclusterSchema))

  const { isError, mutate } = useMutation({
    mutationFn: (body: TreeClusterUpdate) =>
      clusterApi.updateTreeCluster({ authorization, clusterId, body }),
    onSuccess: (data) => onUpdateSuccess(data),
    onError: () => onUpdateError(),
  })

  const onUpdateSuccess = useCallback(
    (data: TreeCluster) => {
      formStore.reset()
      navigate({
        to: `/treecluster/${data.id}`,
        search: { resetStore: false },
        replace: true,
      })
      showToast('Die Bewässerungsgruppe wurde erfolgreich editiert.')
    },
    [formStore, navigate, showToast]
  )

  const onUpdateError = () => {
    console.error('Error updating treecluster')
  }

  const onSubmit: SubmitHandler<TreeclusterSchema> = async (data) => {
    mutate({
      ...data,
      treeIds: formStore.form?.treeIds ?? [],
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

  const handleDeleteTreeCluster = () => {
    return clusterApi.deleteTreeCluster({
      authorization,
      clusterId: String(clusterId),
    })
  }

  return (
    <div className="container mt-6">
      {isError ? (
        <p className="text-red text-lg">
          Eine Bewässerungsgruppe mit der Nummer {clusterId} gibt es nicht oder
          die Daten zur Bewässerungsgruppe konnten nicht geladen werden.
        </p>
      ) : (
        <div>
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
              Labore est cillum aliqua do consectetur. Do anim officia sunt
              magna nisi eiusmod sit excepteur qui aliqua duis irure in cillum
              cillum.
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

          <DeleteSection
            mutationFn={handleDeleteTreeCluster}
            entityName="die Bewässerungsgruppe"
            redirectUrl={{ to: "/treecluster" }}
          />
        </div>
      )}
    </div>
  )
}
