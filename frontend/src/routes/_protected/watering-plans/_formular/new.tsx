import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  WateringPlanStatus,
} from '@/api/backendApi'
import { SubmitHandler } from 'react-hook-form'
import {
  useSuspenseQuery,
} from '@tanstack/react-query'
import useFormStore from '@/store/form/useFormStore'
import { useFormSync } from '@/hooks/form/useFormSync'
import { zodResolver } from '@hookform/resolvers/zod'
import { useInitForm } from '@/hooks/form/useInitForm'
import BackLink from '@/components/general/links/BackLink'
import { userQuery, vehicleQuery } from '@/api/queries'
import {
  WateringPlanForm,
  WateringPlanSchema,
} from '@/schema/wateringPlanSchema'
import FormForWateringPlan from '@/components/general/form/FormForWateringPlan'
import useStore from '@/store/store'
import { useWaterinPlanForm } from '@/hooks/form/useWateringPlanForm'

export const Route = createFileRoute(
  '/_protected/watering-plans/_formular/new'
)({
  beforeLoad: () => {
    useFormStore.getState().setType('new')
  },
  component: NewWateringPlan,
  meta: () => [{ title: 'Neuen Einsatzplan' }],
})

function NewWateringPlan() {
  const { mutate, isError, error } = useWaterinPlanForm('create')
  const navigate = useNavigate({ from: Route.fullPath })
  const { data: users } = useSuspenseQuery(userQuery())
  const { data: trailers } = useSuspenseQuery(
    vehicleQuery({
      type: 'trailer',
    })
  )
  const { data: transporters } = useSuspenseQuery(
    vehicleQuery({
      type: 'transporter',
    })
  )
  const { initForm } = useInitForm<WateringPlanForm>({
    date: new Date().toISOString().substring(0, 10),
    description: '',
    transporterId: -1,
    trailerId: -1, // TODO: why not undefined?
    treeClusterIds: [],
    status: WateringPlanStatus.WateringPlanStatusPlanned,
    cancellationNote: '',
    userIds: [],
  })

  const mapPosition = useStore((state) => ({
    lat: state.map.center[0],
    lng: state.map.center[1],
    zoom: state.map.zoom,
  }))

  const { register, handleSubmit, formState } = useFormSync<WateringPlanForm>(
    initForm,
    zodResolver(WateringPlanSchema(true))
  )

  const onSubmit: SubmitHandler<WateringPlanForm> = (data) => {
    mutate({
      ...data,
      date: data.date.toISOString(),
      trailerId:
      data.trailerId && data.trailerId !== -1
        ? data.trailerId
        : undefined,
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

  return (
    <div className="container mt-6">
      <article className="2xl:w-4/5">
        <BackLink
          link={{ to: '/watering-plans' }}
          label="Zu allen Einsatzplänen"
        />
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Neuen Einsatzplan erstellen
        </h1>
        <p className="mb-5">
          Ein Einsatzplan bildet eine Bewässerungsroute ab, indem ihr ein
          Fahrzeug, einen Anhänger, Mitarbeitende und anzufahrende
          Bewässerungsgruppen zugewiesen werden können. Ein neu erstellter
          Einsatzplan wird automatisch als »geplant« eingestuft. Anhand der
          Bewässerungsgruppen und die Anzahl der Bäume wird berechnet, wie viel
          Wasser zum bewässsern benötigt wird. Ein Einsatzplan startet immer an
          der Hauptzentrale des TBZ in der Schleswiger Straße in Flensburg.
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
          users={users.data}
          onAddCluster={navigateToClusterSelect}
          errorMessage={error?.message}
        />
      </section>
    </div>
  )
}

export default NewWateringPlan
