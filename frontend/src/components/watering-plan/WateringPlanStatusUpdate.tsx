import { useMutation } from '@tanstack/react-query'
import BackLink from '../general/links/BackLink'
import {
  WateringPlan,
  WateringPlanUpdate,
} from '@green-ecolution/backend-client'
import { useInitFormQuery } from '@/hooks/form/useInitForm'
import { wateringPlanIdQuery } from '@/api/queries'
import { wateringPlanApi } from '@/api/backendApi'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler } from 'react-hook-form'
import { useFormSync } from '@/hooks/form/useFormSync'
import {
  WateringPlanForm,
  WateringPlanSchema,
} from '@/schema/wateringPlanSchema'
import { format } from 'date-fns'
import PrimaryButton from '../general/buttons/PrimaryButton'
import FormError from '../general/form/FormError'
import Select from '../general/form/types/Select'
import {
  getWateringPlanStatusDetails,
  WateringPlanStatusOptions,
} from '@/hooks/useDetailsForWateringPlanStatus'
import Pill from '../general/Pill'

interface WateringPlanStatusUpdateProps {
  wateringPlanId: string
  onUpdateSuccess: (data: WateringPlan) => void
  onUpdateError: () => void
}

const WateringPlanStatusUpdate = ({
  wateringPlanId,
  onUpdateError,
  onUpdateSuccess,
}: WateringPlanStatusUpdateProps) => {
  const { initForm, loadedData } = useInitFormQuery<
    WateringPlan,
    WateringPlanForm
  >(wateringPlanIdQuery(wateringPlanId), (data) => ({
    date: new Date(data.date),
    description: data.description,
    transporterId: data.transporter.id,
    trailerId: data.trailer?.id,
    treeClusterIds: data.treeclusters.map((cluster) => cluster.id),
    status: data.status,
  }))

  const date = loadedData?.date
    ? format(new Date(loadedData?.date), 'dd.MM.yyyy')
    : 'Keine Angabe'
  const statusDetails = getWateringPlanStatusDetails(loadedData?.status)

  const { register, handleSubmit, formState } = useFormSync<WateringPlanForm>(
    initForm,
    zodResolver(WateringPlanSchema())
  )

  const { isError, mutate } = useMutation({
    mutationFn: (body: WateringPlanUpdate) =>
      wateringPlanApi.updateWateringPlan({ id: wateringPlanId, body }),
    onSuccess: (data) => onUpdateSuccess(data),
    onError: () => onUpdateError(),
    throwOnError: true,
  })

  const onSubmit: SubmitHandler<WateringPlanForm> = async (data) => {
    mutate({
      ...data,
      date: data.date.toISOString(),
      trailerId:
        data.trailerId && data.trailerId !== -1 && data.trailerId !== '-1'
          ? data.trailerId
          : undefined,
      usersIds: [],
      cancellationNote: '',
      evaluation: [],
    })
  }

  return (
    <>
      <article className="2xl:w-4/5">
        <BackLink
          label="Zurück zur Fahrzeugübersicht"
          link={{
            to: `/watering-plans/$wateringPlanId`,
            params: { wateringPlanId: wateringPlanId?.toString() },
          }}
        />
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Status vom Einsatzplan {date} bearbeiten
        </h1>
        <p className="mb-5">
          Der Status eines Einsatzes beschreibt, ob er Einsatz beispielsweise
          aktiv ausgeführt wird, beendet ist oder abgebrochen wurde. Diese
          Angabe hilft dabei die erstellen Einsätze zu kategorisieren und eine
          Auswertung anzulegen. Sobald ein Einsatz beendet wird, kann zudem
          angegeben werden, mit wie viel Wasser die zugehörigen
          Bewässerungsgruppen bewässert wurden.
        </p>

        <p className="space-x-3">
          <strong>Aktueller Status:</strong>
          <Pill
            label={statusDetails?.label ?? 'Keine Angabe'}
            theme={statusDetails?.color ?? 'dark-400'}
          />
        </p>
      </article>

      <section className="mt-10">
        <form
          className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-11"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-6">
            <Select
              options={WateringPlanStatusOptions}
              placeholder="Wählen Sie einen Status aus"
              label="Status des Einsatzes"
              required
              error={formState.errors.status?.message}
              {...register('status')}
            />
          </div>

          <FormError
            show={isError}
            error="Es ist leider ein Problem aufgetreten. Bitte probieren Sie es erneut oder wenden Sie sich an einen Systemadministrierenden."
          />

          <PrimaryButton
            type="submit"
            label="Speichern"
            disabled={!formState.isValid}
            className="mt-10 lg:col-span-full lg:w-fit"
          />
        </form>
      </section>
    </>
  )
}

export default WateringPlanStatusUpdate
