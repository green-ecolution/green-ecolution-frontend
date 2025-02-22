import { useSuspenseQuery } from '@tanstack/react-query'
import BackLink from '../general/links/BackLink'
import { useInitFormQuery } from '@/hooks/form/useInitForm'
import { userRoleQuery, vehicleQuery, wateringPlanIdQuery } from '@/api/queries'
import { format } from 'date-fns'
import FormForWateringPlan from '../general/form/FormForWateringPlan'
import { useNavigate } from '@tanstack/react-router'
import { Route } from '@/routes'
import useStore from '@/store/store'
import GeneralLink from '../general/links/GeneralLink'
import { showWateringPlanStatusButton } from '@/hooks/details/useDetailsForWateringPlanStatus'
import LoadingInfo from '../general/error/LoadingInfo'
import { Suspense } from 'react'
import DeleteSection from '../treecluster/DeleteSection'
import { wateringPlanApi } from '@/api/backendApi'
import { useWaterinPlanForm } from '@/hooks/form/useWateringPlanForm'
import { useFormSync } from '@/hooks/form/useFormSync'
import { WateringPlanForm, WateringPlanSchema } from '@/schema/wateringPlanSchema'
import { SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

interface WateringPlanUpdateProps {
  wateringPlanId: string
}

const WateringPlanUpdate = ({ wateringPlanId }: WateringPlanUpdateProps) => {
  const { mutate, isError, error } = useWaterinPlanForm(
    'update',
    wateringPlanId
  )
  const { initForm, loadedData } = useInitFormQuery(
    wateringPlanIdQuery(wateringPlanId),
    (data) => ({
      date: new Date(data.date).toISOString().substring(0, 10),
      description: data.description,
      transporterId: data.transporter.id,
      trailerId: data.trailer?.id,
      treeClusterIds: data.treeclusters.map((cluster) => cluster.id),
      status: data.status,
      cancellationNote: data.cancellationNote,
      userIds: data.userIds,
    })
  )

  const navigate = useNavigate({ from: Route.fullPath })
  const date = loadedData?.date
    ? format(new Date(loadedData?.date), 'dd.MM.yyyy')
    : 'Keine Angabe'

  const { data: users } = useSuspenseQuery(userRoleQuery('tbz'))

  const { data: trailers } = useSuspenseQuery(vehicleQuery({ type: 'trailer' }))
  const { data: transporters } = useSuspenseQuery(
    vehicleQuery({ type: 'transporter' })
  )

  const { register, handleSubmit, formState } =
    useFormSync<WateringPlanForm>(
      initForm,
      zodResolver(WateringPlanSchema(false))
    )

  const onSubmit: SubmitHandler<WateringPlanForm> = async (data) => {
    mutate({
      ...data,
      date: data.date.toISOString(),
      trailerId:
        data.trailerId && data.trailerId !== -1 ? data.trailerId : undefined,
    })
  }

  const mapPosition = useStore((state) => ({
    lat: state.map.center[0],
    lng: state.map.center[1],
    zoom: state.map.zoom,
  }))

  const navigateToClusterSelect = () => {
    navigate({
      to: '/map/watering-plan/select/cluster',
      search: {
        lat: mapPosition.lat,
        lng: mapPosition.lng,
        zoom: mapPosition.zoom,
        wateringPlanId: Number(wateringPlanId),
      },
    })
  }

  const handleDeleteWateringPlan = () => {
    return wateringPlanApi.deleteWateringPlan({
      id: String(wateringPlanId),
    })
  }

  return (
    <>
      <article className="2xl:w-4/5">
        <BackLink
          label="Zurück zum Einsatzplan"
          link={{
            to: `/watering-plans/$wateringPlanId`,
            params: { wateringPlanId: wateringPlanId?.toString() },
          }}
        />
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Einsatzplan für den {date} bearbeiten
        </h1>
        <p>
          Der Einsatzplan kann in dieser Ansicht editiert werden, falls
          bestimmte Daten nicht mehr stimmen oder z. B. bestimmte Informationen
          zusätzlich hinterlegt werden müssen. Ein Einsatzplan erfordert immer
          mindestens eine Bewässerungsgruppe, die angefahren werden soll und
          mindestens eine:n Mitarbeiter:in, die den Einatz durchführen soll.
          Zudem muss ein Fahrzeug hinterlegt werden.
        </p>
        {showWateringPlanStatusButton(loadedData) && (
          <p className="mt-5 flex flex-wrap gap-x-4">
            Der Status eines Einsatzes kann seperat editiert werden.
            <GeneralLink
              link={{
                to: `/watering-plans/$wateringPlanId/status/edit`,
                params: { wateringPlanId: String(loadedData.id) },
              }}
              label="Status aktualisieren"
            />
          </p>
        )}
      </article>

      <section className="mt-10">
        <FormForWateringPlan
          register={register}
          handleSubmit={handleSubmit}
          displayError={isError}
          formState={formState}
          onSubmit={onSubmit}
          users={users.data}
          trailers={trailers.data}
          transporters={transporters.data}
          onAddCluster={navigateToClusterSelect}
          errorMessage={error?.message}
        />
      </section>

      <Suspense
        fallback={<LoadingInfo label="Der Einsatzplan wird gelöscht" />}
      >
        <DeleteSection
          mutationFn={handleDeleteWateringPlan}
          entityName="der Einsatzplan"
          redirectUrl={{ to: '/watering-plans' }}
        />
      </Suspense>
    </>
  )
}

export default WateringPlanUpdate
