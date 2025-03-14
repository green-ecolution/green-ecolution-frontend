import PrimaryButton from '../buttons/PrimaryButton'
import Input from './types/Input'
import Select from './types/Select'
import Textarea from './types/Textarea'
import FormError from './FormError'
import { WateringPlanForm } from '@/schema/wateringPlanSchema'
import { User, Vehicle } from '@green-ecolution/backend-client'
import { FormForProps } from './FormForTreecluster'
import SelectEntities from './types/SelectEntities'
import useFormStore, { FormStore } from '@/store/form/useFormStore'
import { getDrivingLicenseDetails } from '@/hooks/details/useDetailsForDrivingLicense'
import { useEffect, useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { treeClusterQuery } from '@/api/queries'

interface FormForWateringPlanProps extends FormForProps<WateringPlanForm> {
  transporters: Vehicle[]
  trailers: Vehicle[]
  users: User[]
  onAddCluster: () => void
}

const FormForWateringPlan = (props: FormForWateringPlanProps) => {
  const { form } = useFormStore(
    (state: FormStore<WateringPlanForm>) => ({
      form: state.form,
    })
  )
  const {data: treeClusters} = useSuspenseQuery(treeClusterQuery())

  const { errors, isValid } = props.formState

  const getDrivingLicensesString = (user: User) => {
    if (!user.drivingLicenses || user.drivingLicenses.length === 0) {
      return 'Keinen Führerschein'
    }
    
    return user.drivingLicenses
      .map(drivingLicense => getDrivingLicenseDetails(drivingLicense).label)
      .join(', ')
  }

  const [selectedTransporter, setSelectedTransporter] = useState('-1')
  const [selectedTrailer, setSelectedTrailer] = useState('-1')
  const [vehicleCapacityError, setVehicleCapacityError] = useState<string | null>(null)

  useEffect(() => {
    const storedTransporter = form?.transporterId?.toString() || '-1'
    const storedTrailer = form?.trailerId?.toString() || '-1'
    setSelectedTransporter(storedTransporter)
    setSelectedTrailer(storedTrailer)
  }, [form?.transporterId, form?.trailerId])

  const calculateTotalWaterNeed = () => {
    if (!form?.treeClusterIds || form.treeClusterIds.length === 0) return 0
    return form.treeClusterIds.reduce((total, clusterId) => {
      const cluster = treeClusters.data.find((c) => c.id === clusterId)
      return total + (cluster?.treeIds?.length ? cluster.treeIds.length * 80 : 0)
    }, 0)
  }

  const validateWaterCapacity = (vehicleId: string, trailerId: string) => {
    if (vehicleId === '-1') {
      setVehicleCapacityError(null)
      return
    }

    const selectedVehicle = props.transporters.find((v) => v.id.toString() === vehicleId)
    const selectedTrailer = props.trailers.find((t) => t.id.toString() === trailerId)

    const vehicleCapacity = selectedVehicle?.waterCapacity || 0
    const trailerCapacity = selectedTrailer?.waterCapacity || 0
    const totalCapacity = vehicleCapacity + trailerCapacity
    const totalWaterNeeded = calculateTotalWaterNeed()
    
    if (totalWaterNeeded > totalCapacity) {
      setVehicleCapacityError(
        'Die Gesamtwasserkapazität von Fahrzeug und Anhänger reicht nicht für die Auswahl an Bewässerungsgruppen.'
      )
    } else {
      setVehicleCapacityError(null)
    }
  }

  const handleTransporterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTransporterId = event.target.value
    setSelectedTransporter(newTransporterId)
    validateWaterCapacity(newTransporterId, selectedTrailer)
  }

  const handleTrailerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTrailerId = event.target.value
    setSelectedTrailer(newTrailerId)
    validateWaterCapacity(selectedTransporter, newTrailerId)
  }

  return (
    <form
      className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-11"
      onSubmit={props.handleSubmit(props.onSubmit)}
    >
      <div className="space-y-6">
        <Input
          label="Datum des Einsatzes"
          error={errors.date?.message}
          required
          type="date"
          {...props.register('date')}
        />
        <Select
          options={[
            { label: 'Kein Fahrzeug', value: '-1' },
            ...props.transporters.map((transporter) => ({
              label: `${transporter.numberPlate.toString()} · ${getDrivingLicenseDetails(transporter.drivingLicense).label}`,
              value: transporter.id.toString(),
            })),
          ]}
          placeholder="Wählen Sie ein Fahrzeug aus"
          label="Verknüpftes Fahrzeug"
          required
          error={errors.transporterId?.message || vehicleCapacityError || ""}
          {...props.register('transporterId', { onChange: handleTransporterChange })}
        />
        <Select
          options={[
            { label: 'Keinen Anhänger', value: '-1' },
            ...props.trailers.map((trailer) => ({
              label: `${trailer.numberPlate.toString()} · ${getDrivingLicenseDetails(trailer.drivingLicense).label}`,
              value: trailer.id.toString(),
            })),
          ]}
          placeholder="Wählen Sie einen Anhänger aus, sofern vorhanden"
          label="Verknüpfter Anhänger"
          error={errors.trailerId?.message}
          {...props.register('trailerId', { onChange: handleTrailerChange })}
        />
        <Select
          options={[
            ...props.users.map((user) => ({
              label: `${user.firstName} ${user.lastName} · ${getDrivingLicensesString(user)}`,
              value: user.id,
            })),
          ]}
          multiple
          placeholder="Wählen Sie Mitarbeitende aus"
          label="Verknüpfte Mitarbeitende"
          description="Indem Sie die Taste »Shift« gedrückt halten, können Sie eine Mehrauswahl tätigen."
          required
          error={errors.userIds?.message}
          {...props.register('userIds')}
        />
        <Textarea
          placeholder="Hier ist Platz für Notizen"
          label="Kurze Beschreibung"
          error={errors.description?.message}
          {...props.register('description')}
        />
      </div>

      <SelectEntities
        onDelete={props.onAddCluster}
        entityIds={form?.treeClusterIds || []}
        onAdd={props.onAddCluster}
        type="cluster"
        required
        label="Bewässerungsgruppen"
        isDisabled={selectedTransporter === '-1'}        
      />

      <FormError
        show={props.displayError}
        error={props.errorMessage}
      />

      <PrimaryButton
        type="submit"
        label="Speichern"
        disabled={!isValid}
        className="mt-10 lg:col-span-full lg:w-fit"
      />
    </form>
  )
}

export default FormForWateringPlan
