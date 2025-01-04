import { useMutation } from '@tanstack/react-query'
import BackLink from '../general/links/BackLink'
import {
  WateringPlan,
  WateringPlanStatus,
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
import Textarea from '../general/form/types/Textarea'

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
    cancellationNote: data.cancellationNote,
  }))

  const date = loadedData?.date
    ? format(new Date(loadedData?.date), 'dd.MM.yyyy')
    : 'Keine Angabe'
  const statusDetails = getWateringPlanStatusDetails(loadedData?.status)

  const { register, handleSubmit, formState, watch } =
    useFormSync<WateringPlanForm>(initForm, zodResolver(WateringPlanSchema(false)))
  const selectedStatus = watch('status')

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
        data.trailerId && data.trailerId !== -1
          ? data.trailerId
          : undefined,
      usersIds: [],
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
          Status vom Einsatzplan {date} bearbeiten
        </h1>
        <p className="space-x-3 mb-5">
          <strong>Aktueller Status:</strong>
          <Pill
            label={statusDetails?.label ?? 'Keine Angabe'}
            theme={statusDetails?.color ?? 'dark-400'}
          />
        </p>
        <p>
          Der Status eines Einsatzes beschreibt, ob er Einsatz beispielsweise
          aktiv ausgeführt wird, beendet ist oder abgebrochen wurde. Diese
          Angabe hilft dabei die erstellen Einsätze zu kategorisieren und eine
          Auswertung anzulegen. Sobald ein Einsatz beendet wird, kann zudem
          angegeben werden, mit wie viel Wasser die zugehörigen
          Bewässerungsgruppen bewässert wurden.
        </p>
      </article>

      <section className="mt-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6 lg:w-1/2">
            <Select
              options={WateringPlanStatusOptions}
              placeholder="Wählen Sie einen Status aus"
              label="Status des Einsatzes"
              required
              error={formState.errors.status?.message}
              {...register('status')}
            />
            {selectedStatus ===
              WateringPlanStatus.WateringPlanStatusCanceled && (
              <Textarea
                placeholder="Warum wurde der Einatz abgebrochen?"
                label="Grund des Abbruchs"
                error={formState.errors.cancellationNote?.message}
                {...register('cancellationNote')}
              />
            )}
          </div>

          <FormError
            show={isError}
            error="Es ist leider ein Problem aufgetreten. Bitte probieren Sie es erneut oder wenden Sie sich an einen Systemadministrierenden."
          />

          <PrimaryButton
            type="submit"
            label="Speichern"
            disabled={!formState.isValid}
            className="mt-10"
          />
        </form>
      </section>
    </>
  )
}

export default WateringPlanStatusUpdate
