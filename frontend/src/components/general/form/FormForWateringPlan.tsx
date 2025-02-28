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

  const { errors, isValid } = props.formState

  const getDrivingLicensesString = (user: User) => {
    if (!user.drivingLicenses || user.drivingLicenses.length === 0) {
      return 'Keinen Führerschein';
    }
    
    return user.drivingLicenses
      .map(drivingLicense => getDrivingLicenseDetails(drivingLicense).label)
      .join(', ');
  };

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
              label: `${transporter.numberPlate.toString()}`,
              value: transporter.id.toString(),
            })),
          ]}
          placeholder="Wählen Sie ein Fahrzeug aus"
          label="Verknüpftes Fahrzeug"
          required
          error={errors.transporterId?.message}
          {...props.register('transporterId')}
        />
        <Select
          options={[
            { label: 'Keinen Anhänger', value: '-1' },
            ...props.trailers.map((trailer) => ({
              label: `${trailer.numberPlate.toString()}`,
              value: trailer.id.toString(),
            })),
          ]}
          placeholder="Wählen Sie einen Anhänger aus, sofern vorhanden"
          label="Verknüpfter Anhänger"
          error={errors.trailerId?.message}
          {...props.register('trailerId')}
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
