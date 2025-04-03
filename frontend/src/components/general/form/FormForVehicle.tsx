import { VehicleForm } from '@/schema/vehicleSchema'
import { FormForProps } from './FormForTreecluster'
import FormError from './FormError'
import PrimaryButton from '../buttons/PrimaryButton'
import Input from './types/Input'
import Textarea from './types/Textarea'
import Select from './types/Select'
import { VehicleTypeOptions } from '@/hooks/details/useDetailsForVehicleType'
import { DrivingLicenseOptions } from '@/hooks/details/useDetailsForDrivingLicense'
import { VehicleStatusOptions } from '@/hooks/details/useDetailsForVehicleStatus'

const FormForVehicle = (props: FormForProps<VehicleForm>) => {
  const { errors, isValid } = props.formState

  return (
    <form
      className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-y-6 lg:gap-x-11"
      onSubmit={props.handleSubmit(props.onSubmit)}
    >
      <Input
        placeholder="Kennzeichen"
        label="Kennzeichen"
        required
        error={errors.numberPlate?.message}
        {...props.register('numberPlate')}
      />
      <Input
        placeholder="Fahrzeugmodell"
        label="Fahrzeugmodell"
        required
        error={errors.model?.message}
        {...props.register('model')}
      />
      <Select
        options={VehicleTypeOptions}
        placeholder="Fahrzeugtyp"
        label="Fahrzeugtyp"
        required
        error={errors.type?.message}
        {...props.register('type')}
      />
      <Input
        placeholder="Wasserkapazität"
        label="Wasserkapazität"
        type="number"
        required
        error={errors.waterCapacity?.message}
        {...props.register('waterCapacity')}
      />
      <Select
        options={VehicleStatusOptions}
        placeholder="Aktueller Fahrzeugstatus"
        label="Aktueller Status"
        required
        error={errors.status?.message}
        {...props.register('status')}
      />
      <Select
        options={DrivingLicenseOptions}
        placeholder="Wählen Sie eine Führerscheinklasse aus"
        label="Führerscheinklasse"
        required
        error={errors.drivingLicense?.message}
        {...props.register('drivingLicense')}
      />
      <Input
        placeholder="Höhe des Fahrzeugs"
        label="Höhe des Fahrzeugs (in Metern)"
        type="number"
        step="0.1"
        required
        error={errors.height?.message}
        {...props.register('height')}
      />
      <Input
        placeholder="Breite des Fahrzeugs"
        label="Breite des Fahrzeugs (in Metern)"
        type="number"
        step="0.1"
        required
        error={errors.width?.message}
        {...props.register('width')}
      />
      <Input
        placeholder="Länge des Fahrzeugs"
        label="Länge des Fahrzeugs (in Metern)"
        type="number"
        step="0.1"
        required
        error={errors.length?.message}
        {...props.register('length')}
      />
      <Input
        placeholder="Gewicht des Fahrzeugs"
        label="Gewicht des Fahrzeugs (in Tonnen)"
        type="number"
        step="0.1"
        required
        error={errors.weight?.message}
        {...props.register('weight')}
      />
      <Textarea
        placeholder="Hier ist Platz für Notizen"
        label="Kurze Beschreibung"
        error={errors.description?.message}
        {...props.register('description')}
      />

      <FormError
        show={props.displayError}
        error={props.errorMessage}
      />

      <PrimaryButton
        type="submit"
        label="Speichern"
        className="mt-10 lg:col-span-full lg:w-fit"
        disabled={!isValid}
      />
    </form>
  )
}

export default FormForVehicle
