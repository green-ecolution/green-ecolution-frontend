import FormForTree from '@/components/general/form/FormForTree'
import { useFormSync } from '@/hooks/form/useFormSync'
import { useInitForm } from '@/hooks/form/useInitForm'
import { TreeForm, TreeSchema } from '@/schema/treeSchema'
import useFormStore from '@/store/form/useFormStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { useMapStore } from '@/store/store'
import { sensorQuery, treeClusterQuery } from '@/api/queries'
import { useTreeForm } from '@/hooks/form/useTreeForm'

const newTreeSearchSchema = z.object({
  lat: z.number(),
  lng: z.number(),
})

export const Route = createFileRoute('/_protected/tree/_formular/new')({
  component: NewTree,
  validateSearch: newTreeSearchSchema,
  loaderDeps: ({ search: { lat, lng } }) => {
    return { lat, lng }
  },
  loader: ({ deps: { lat, lng } }) => {
    const storeNotInit = useFormStore.getState().isEmpty()
    return {
      lat: storeNotInit ? lat : useFormStore.getState().form.latitude,
      lng: storeNotInit ? lng : useFormStore.getState().form.longitude,
    }
  },
  meta: () => [{ title: 'Neuer Baum' }],
})

function NewTree() {
  const { mutate, isError, error, formStore } = useTreeForm('create')
  const { lat, lng } = Route.useLoaderData()
  const navigate = useNavigate({ from: Route.fullPath })
  const map = useMapStore()
  const { data: sensors } = useSuspenseQuery(sensorQuery())
  const { data: treeClusters } = useSuspenseQuery(treeClusterQuery())

  const { initForm } = useInitForm<TreeForm>({
    latitude: lat,
    longitude: lng,
    number: '',
    species: '',
    plantingYear: new Date().getFullYear(),
    treeClusterId: -1,
    sensorId: '-1',
    description: '',
    readonly: false,
  })

  const { register, handleSubmit, formState } = useFormSync<TreeForm>(
    initForm,
    zodResolver(TreeSchema(lat, lng))
  )

  const onSubmit = (data: TreeForm) => {
    mutate({
      ...data,
      sensorId:
        data.sensorId && data.sensorId !== '-1' ? data.sensorId : undefined,
      treeClusterId:
        data.treeClusterId &&
        (data.treeClusterId === '-1' || data.treeClusterId <= 0)
          ? undefined
          : data.treeClusterId,
    })
  }

  const handleOnChangeLocation = () => {
    navigate({
      to: '/map/tree/edit',
      search: {
        lat: formStore.form?.latitude ?? 0,
        lng: formStore.form?.longitude ?? 0,
        zoom: map.zoom,
      },
    })
  }

  return (
    <div className="container mt-6">
      <article className="2xl:w-4/5">
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Neuen Baum erfassen
        </h1>
        <p className="mb-5">
          Hier können Sie einen neuen Baum erstellen. Dieser wird im System als
          "manuell erstellt" erfasst.
        </p>
      </article>

      <section className="mt-10">
        <FormForTree
          isReadonly={false}
          register={register}
          handleSubmit={handleSubmit}
          formState={formState}
          treeClusters={treeClusters.data}
          sensors={sensors.data}
          onSubmit={onSubmit}
          displayError={isError}
          onChangeLocation={handleOnChangeLocation}
          errorMessage={error?.message}
        />
      </section>
    </div>
  )
}
