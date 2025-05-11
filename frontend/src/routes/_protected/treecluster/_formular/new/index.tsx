import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { SoilCondition } from '@/api/backendApi'
import { SubmitHandler } from 'react-hook-form'
import { TreeclusterForm, TreeclusterSchema } from '@/schema/treeclusterSchema'
import FormForTreecluster from '@/components/general/form/FormForTreecluster'
import useFormStore from '@/store/form/useFormStore'
import { useFormSync } from '@/hooks/form/useFormSync'
import { zodResolver } from '@hookform/resolvers/zod'
import { useInitForm } from '@/hooks/form/useInitForm'
import useStore from '@/store/store'
import BackLink from '@/components/general/links/BackLink'
import { useTreeClusterForm } from '@/hooks/form/useTreeClusterForm'

export const Route = createFileRoute('/_protected/treecluster/_formular/new/')({
  beforeLoad: () => {
    useFormStore.getState().setType('new')
  },
  component: NewTreecluster,
})

function NewTreecluster() {
  const { mutate, isError, error, formStore } = useTreeClusterForm('create')
  const navigate = useNavigate({ from: Route.fullPath })
  const { initForm } = useInitForm<TreeclusterForm>({
    name: '',
    address: '',
    description: '',
    soilCondition: SoilCondition.TreeSoilConditionUnknown,
    treeIds: [],
  })

  const mapPosition = useStore((state) => ({
    lat: state.map.center[0],
    lng: state.map.center[1],
    zoom: state.map.zoom,
  }))

  const { register, setValue, handleSubmit, formState } = useFormSync<TreeclusterForm>(
    initForm,
    zodResolver(TreeclusterSchema),
  )

  const onSubmit: SubmitHandler<TreeclusterForm> = (data) => {
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
    }).catch((error) => console.error('Navigation failed:', error))
  }

  const handleDeleteTree = (treeId: number) => {
    setValue('treeIds', formStore.form?.treeIds?.filter((id) => id !== treeId) ?? [])
  }

  return (
    <div className="container mt-6">
      <article className="2xl:w-4/5">
        <BackLink link={{ to: '/treecluster' }} label="Zu allen Bewässerungsgruppen" />
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Neue Bewässerungsgruppe erstellen
        </h1>
        <p className="mb-5">
          In dieser Ansicht kannst du eine neue Bewässerungsgruppe erstellen und dieser Bäume
          zuweisen.
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
          errorMessage={error?.message}
        />
      </section>
    </div>
  )
}

export default NewTreecluster
