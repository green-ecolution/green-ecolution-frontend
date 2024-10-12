import { Tree, treeApi, TreeUpdate } from '@/api/backendApi'
import FormForTree from '@/components/general/form/FormForTree'
import { useFormSync } from '@/hooks/form/useFormSync'
import { useInitFormQuery } from '@/hooks/form/useInitForm'
import { useAuthHeader } from '@/hooks/useAuthHeader'
import { TreeForm, TreeSchema } from '@/schema/treeSchema'
import { TreeclusterSchema } from '@/schema/treeclusterSchema'
import useFormStore, { FormStore } from '@/store/form/useFormStore'
import useStore, { useMapStore } from '@/store/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { sensorQuery, treeClusterQuery, treeQuery } from '../_formular'
import { useRef } from 'react'
import BackLink from '@/components/general/links/BackLink'
import useToast from '@/hooks/useToast'

export const Route = createFileRoute('/_protected/tree/_formular/$treeId/edit')(
  {
    component: EditTreeCluster,
    beforeLoad: () => {
      useFormStore.getState().setType('edit')
    },
    loader: ({ params: { treeId } }) => {
      const token = useStore.getState().auth.token?.accessToken ?? ''
      return {
        tree: treeQuery(treeId, token),
        sensors: sensorQuery(token),
        clusters: treeClusterQuery(token),
      }
    },
  }
)

function EditTreeCluster() {
  const authorization = useAuthHeader()
  const showToast = useToast()
  const treeId = Route.useParams().treeId
  const navigate = useNavigate({ from: Route.fullPath })
  const skipBlocker = useRef(false)
  const { data: sensors } = useSuspenseQuery(sensorQuery(authorization))
  const map = useMapStore()
  const { data: treeClusters } = useSuspenseQuery(
    treeClusterQuery(authorization)
  )
  const { initForm, loadedData } = useInitFormQuery<Tree, TreeForm>(
    treeQuery(treeId, authorization),
    (data) => ({
      latitude: data.latitude,
      longitude: data.longitude,
      treeNumber: data.treeNumber,
      species: data.species,
      plantingYear: data.plantingYear,
      treeClusterId: data.treeClusterId ?? -1,
      sensorId: data.sensor?.id ?? -1,
      description: '', // data.description,
    })
  )

  const formStore = useFormStore((state: FormStore<TreeclusterSchema>) => ({
    form: state.form,
    reset: state.reset,
  }))

  const { register, handleSubmit, formState } = useFormSync<TreeForm>(
    initForm,
    zodResolver(TreeSchema(initForm?.latitude ?? 0, initForm?.longitude ?? 0))
  )

  const { isError, mutate } = useMutation({
    mutationFn: (tree: TreeUpdate) =>
      treeApi.updateTree({
        authorization,
        treeId: treeId,
        body: tree,
      }),
    onSuccess: (data) => {
      formStore.reset()
      navigate({
        to: '/tree/$treeId',
        params: { treeId: data.id.toString() },
        search: { resetStore: false },
        replace: true,
      })
      showToast("Der Baum wurde erfolgreich editiert")
    },
  })

  const onSubmit = (data: TreeForm) => {
    mutate({
      ...data,
      sensorId: data.sensorId === '-1' ? undefined : data.sensorId,
      treeClusterId:
        data.treeClusterId === '-1' ? undefined : data.treeClusterId,
      readonly: false,
    })
  }

  const handleOnChangeLocation = () => {
    skipBlocker.current = true
    navigate({
      to: '/map/tree/edit',
      search: {
        treeId: Number(treeId),
        lat: initForm?.latitude ?? 0,
        lng: initForm?.longitude ?? 0,
        zoom: map.zoom,
      },
    })
    showToast("Der Baum wurde erfolgreich editiert.")
  }

  return (
    <div className="container mt-6">
      {isError ? (
        <p className="text-red text-lg">
          Einen Baum mit der Nummer {treeId} gibt es nicht oder die Daten zum
          Baum konnten nicht geladen werden.
        </p>
      ) : (
        <div>
          <BackLink
            link={{ to: '/tree/$treeId', params: { treeId } }}
            label="Zurück zur Übersicht"
          />
          <article className="2xl:w-4/5">
            <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
              Baum {loadedData.treeNumber} bearbeiten
            </h1>
            <p className="mb-5">
              Labore est cillum aliqua do consectetur. Do anim officia sunt
              magna nisi eiusmod sit excepteur qui aliqua duis irure in cillum
              cillum.
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
        </div>
      )}
    </div>
  )
}
