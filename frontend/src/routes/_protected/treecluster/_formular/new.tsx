import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  clusterApi,
  EntitiesTreeSoilCondition,
  TreeClusterCreate,
} from '@/api/backendApi'
import { SubmitHandler } from 'react-hook-form'
import { TreeclusterSchema } from '@/schema/treeclusterSchema'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import FormForTreecluster from '@/components/general/form/FormForTreecluster'
import useFormStore, { FormStore } from '@/store/form/useFormStore'
import { useFormSync } from '@/hooks/form/useFormSync'
import { zodResolver } from '@hookform/resolvers/zod'
import { useInitForm } from '@/hooks/form/useInitForm'
import useStore from '@/store/store'
import BackLink from '@/components/general/links/BackLink'
import useToast from '@/hooks/useToast'
import { treeClusterQuery } from '@/api/queries'

export const Route = createFileRoute('/_protected/treecluster/_formular/new')({
  beforeLoad: () => {
    useFormStore.getState().setType('new')
  },
  component: NewTreecluster,
  meta: () => [{ title: 'Neue Bewässerungsgruppe' }],
})

function NewTreecluster() {
  const showToast = useToast()
  const navigate = useNavigate({ from: Route.fullPath })
  const queryClient = useQueryClient()
  const { initForm } = useInitForm<TreeclusterSchema>({
    name: '',
    address: '',
    description: '',
    soilCondition: EntitiesTreeSoilCondition.TreeSoilConditionUnknown,
    treeIds: [],
  })
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
    mutationFn: (cluster: TreeClusterCreate) =>
      clusterApi.createTreeCluster({
        body: cluster,
      }),
    onSuccess: (data) => {
      formStore.reset()
      navigate({
        to: `/treecluster/${data.id}`,
        search: { resetStore: false },
        replace: true,
      })
      queryClient.invalidateQueries(treeClusterQuery())
      showToast("Die Bewässerungsgruppe wurde erfolgreich erstellt.")
    },
    onError: () => {
      console.error('Error creating treecluster')
    },
  })

  const onSubmit: SubmitHandler<TreeclusterSchema> = (data) => {
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
    <div className="container mt-6">
      <article className="2xl:w-4/5">
        <BackLink
          link={{ to: '/treecluster' }}
          label="Zu allen Bewässerungsgruppen"
        />
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Neue Bewässerungsgruppe erstellen
        </h1>
        <p className="mb-5">
          In dieser Ansicht können Sie eine neue Bewässerungsgruppe erstellen sowie dieser Bäume zuweisen.
        </p>
      </article>

      <section className="mt-10">
        <FormForTreecluster
          register={register}
          handleSubmit={handleSubmit}
          displayError={isError}
          formState={formState}
          onSubmit={onSubmit}
          onAddTrees={navigateToTreeSelect}
          onDeleteTree={handleDeleteTree}
        />
      </section>
    </div>
  )
}

export default NewTreecluster
