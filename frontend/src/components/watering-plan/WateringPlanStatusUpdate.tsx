import { useState } from 'react'
import BackLink from '../general/links/BackLink'
import {
  WateringPlanStatus,
  WateringStatus,
} from '@green-ecolution/backend-client'
import { useInitFormQuery } from '@/hooks/form/useInitForm'
import { wateringPlanIdQuery } from '@/api/queries'
import { format } from 'date-fns'
import PrimaryButton from '../general/buttons/PrimaryButton'
import FormError from '../general/form/FormError'
import Select from '../general/form/types/Select'
import {
  getWateringPlanStatusDetails,
  WateringPlanStatusOptions,
} from '@/hooks/details/useDetailsForWateringPlanStatus'
import Pill from '../general/Pill'
import Textarea from '../general/form/types/Textarea'
import { useWaterinPlanForm } from '@/hooks/form/useWateringPlanForm'
import { useFormSync } from '@/hooks/form/useFormSync'
import {
  WateringPlanForm,
  WateringPlanSchema,
} from '@/schema/wateringPlanSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler } from 'react-hook-form'
import { getWateringStatusDetails } from '@/hooks/details/useDetailsForWateringStatus'
import Input from '../general/form/types/Input'
import TreeclusterCardSmall from '../general/cards/TreeclusterCardSmall'

interface WateringPlanStatusUpdateProps {
  wateringPlanId: string
}

const WateringPlanStatusUpdate = ({
  wateringPlanId,
}: WateringPlanStatusUpdateProps) => {
  const { mutate, isError, error } = useWaterinPlanForm(
    'update',
    wateringPlanId
  )

  const { initForm, loadedData } = useInitFormQuery(
    wateringPlanIdQuery(wateringPlanId),
    (data) => ({
      date: new Date(data.date),
      description: data.description,
      transporterId: data.transporter.id,
      trailerId: data.trailer?.id,
      treeClusterIds: data.treeclusters.map((cluster) => cluster.id),
      status: data.status,
      cancellationNote: data.cancellationNote,
      userIds: data.userIds,
      evaluation: data.treeclusters?.map(cluster => ({
        consumedWater: (cluster.treeIds?.length ?? 0) * 120,
        treeClusterId: cluster.id,
        wateringPlanId: Number(wateringPlanId),
      })),
    })
  )

  const date = loadedData?.date
    ? format(new Date(loadedData?.date), 'dd.MM.yyyy')
    : 'Keine Angabe'
  const statusDetails = getWateringPlanStatusDetails(loadedData?.status)

  const { register, handleSubmit, formState, watch } =
    useFormSync<WateringPlanForm>(
      initForm,
      zodResolver(WateringPlanSchema(false))
    )

  const [manualEvaluation, setManualEvaluation] = useState(
    loadedData?.treeclusters.map(cluster => ({
      consumedWater: (cluster.treeIds?.length ?? 0) * 120,
      treeClusterId: cluster.id,
      wateringPlanId: Number(wateringPlanId),
    })) || []
  )

  const [errorMessages, setErrorMessages] = useState<string[]>([])

  const handleConsumedWaterChange = (index: number, value: string) => {
    const numericValue = Number(value)

    if (isNaN(numericValue)) {
      return
    }

    if (numericValue < 0) {
      setErrorMessages(prev => {
        const newErrors = [...prev]
        newErrors[index] = "Wert darf nicht unter 0 sein"
        return newErrors
      })
    } else {
      setErrorMessages(prev => {
        const newErrors = [...prev]
        newErrors[index] = ""
        return newErrors
      })
    }

    setManualEvaluation(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, consumedWater: numericValue } : item
      )
    )
  }

  const onSubmit: SubmitHandler<WateringPlanForm> = async (data) => {
    if (errorMessages.some(msg => msg !== "")) return;
    const evaluationData = selectedStatus === WateringPlanStatus.WateringPlanStatusFinished
    ? manualEvaluation
    : [];

    mutate({
      ...data,
      date: data.date.toISOString(),
      trailerId:
        data.trailerId && data.trailerId !== -1 ? data.trailerId : undefined,
      evaluation: evaluationData
    })
  }

  const selectedStatus = watch('status')

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
          Der Status eines Einsatzes beschreibt, ob der Einsatz beispielsweise
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
                  placeholder="Warum wurde der Einsatz abgebrochen?"
                  label="Grund des Abbruchs"
                  error={formState.errors.cancellationNote?.message}
                  {...register('cancellationNote')}
                />
              )}
            {selectedStatus ===
              WateringPlanStatus.WateringPlanStatusFinished && (
                <div className="space-y-3">
                  <p>Wasservergabe pro Bewässerungsgruppe:</p>

                  <ul className='space-y-5'>
                    {manualEvaluation.map((field, index) => (
                      <li>
                        <div key={field.treeClusterId} className="flex items-center gap-x-4">
                          <TreeclusterCardSmall
                            name={loadedData?.treeclusters[index].name}
                            id={loadedData?.treeclusters[index].id}
                            status={loadedData.treeclusters[index].wateringStatus}
                          />
                          <div className="flex items-center">
                            <Input
                              error={errorMessages[index]}
                              label="Liter"
                              hideLabel={true}
                              value={field.consumedWater}
                              onChange={(e) => handleConsumedWaterChange(index, e.target.value)}
                            />
                            <span className="ml-2">Liter</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p>Die Standardwerte ergeben sich aus 120 Litern pro Baum einer Bewässerungsgruppe.</p>
                </div>
              )}
          </div>

          <FormError show={isError} error={error?.message} />

          <PrimaryButton
            type="submit"
            label="Speichern"
            disabled={errorMessages.some(msg => msg !== "")}
            className="mt-10"
          />
        </form>
      </section>
    </>
  )
}

export default WateringPlanStatusUpdate
