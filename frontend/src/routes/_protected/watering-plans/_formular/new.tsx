import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  wateringPlanApi,
  WateringPlanCreate,
} from '@/api/backendApi'
import { SubmitHandler } from 'react-hook-form'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import useFormStore, { FormStore } from '@/store/form/useFormStore'
import { useFormSync } from '@/hooks/form/useFormSync'
import { zodResolver } from '@hookform/resolvers/zod'
import { useInitForm } from '@/hooks/form/useInitForm'
import BackLink from '@/components/general/links/BackLink'
import useToast from '@/hooks/useToast'
import { treeClusterQuery, vehicleQuery } from '@/api/queries'
import { WateringPlanForm, WateringPlanSchema } from '@/schema/wateringPlanSchema'
import FormForWateringPlan from '@/components/general/form/FormForWateringPlan'
import useStore from '@/store/store'

export const Route = createFileRoute('/_protected/watering-plans/_formular/new')({
  beforeLoad: () => {
    useFormStore.getState().setType('new')
  },
  component: NewWateringPlan,
  meta: () => [{ title: 'Neuen Einsatzplan' }],
})

function NewWateringPlan() {
  const showToast = useToast()
  const navigate = useNavigate({ from: Route.fullPath })
  const queryClient = useQueryClient()
  const { data: trailers } = useSuspenseQuery(vehicleQuery({
    type: 'trailer',
  }))
  const { data: transporters } = useSuspenseQuery(vehicleQuery({
    type: 'transporter',
}))

  const { initForm } = useInitForm<WateringPlanForm>({
    date: new Date,
    description: '',
    transporterId: -1,
    trailerId: -1,
    //treeClusterIds: [],
  })
  const formStore = useFormStore((state: FormStore<WateringPlanForm>) => ({
    form: state.form,
    reset: state.reset,
  }))

  const mapPosition = useStore((state) => ({
    lat: state.map.center[0],
    lng: state.map.center[1],
    zoom: state.map.zoom,
  }))

  const { register, handleSubmit, formState } =
    useFormSync<WateringPlanForm>(initForm, zodResolver(WateringPlanSchema()))

  const { isError, mutate } = useMutation({
    mutationFn: (wateringPlan: WateringPlanCreate) =>
      wateringPlanApi.createWateringPlan({
        body: wateringPlan,
      }),
    onSuccess: (data) => {
      formStore.reset()
      navigate({
        to: `/watering-plans/${data.id}`,
        search: { resetStore: false },
        replace: true,
      })
      queryClient.invalidateQueries(treeClusterQuery())
      showToast("Der Einsatzplan wurde erfolgreich erstellt.")
    },
    onError: () => {
      console.error('Error creating watering plan')
    },
  })

  const onSubmit: SubmitHandler<WateringPlanForm> = (data) => {
    mutate({
      ...data,
      date: data.date.toISOString(),
      trailerId: data.trailerId && data.trailerId !== -1 &&  data.trailerId !== '-1' ? data.trailerId : undefined,
      treeClusterIds: [],
      usersIds: [],
    })
  }

  const navigateToClusterSelect = () => {
    navigate({
      to: '/map/watering-plan/select/cluster',
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
          Neuen Einsatzplan erstellen
        </h1>
        <p className="mb-5">
          Ein Einsatzplan bildet eine Bewässerungsroute ab, indem ihr ein Fahrzeug, einen Anhänger, Mitarbeitende und anzufahrende Bewässerungsgruppen zugewiesen werden können. 
          Ein neu erstellter Einsatzplan wird automatisch als »geplant« eingestuft. Anhand der Bewässerungsgruppen und die Anzahl der Bäume 
          wird berechnet, wie viel Wasser zum bewässsern benötigt wird. Ein Einsatzplan startet immer an der Hauptzentrale des TBZ in der Schleswiger Straße in Flensburg.
        </p>
      </article>

      <section className="mt-10">
        <FormForWateringPlan
          register={register}
          handleSubmit={handleSubmit}
          displayError={isError}
          formState={formState}
          onSubmit={onSubmit}
          trailers={trailers.data}
          transporters={transporters.data}
          onAddCluster={navigateToClusterSelect}
          onDeleteCluster={handleDeleteTree}
        />
      </section>
    </div>
  )
}

export default NewWateringPlan
