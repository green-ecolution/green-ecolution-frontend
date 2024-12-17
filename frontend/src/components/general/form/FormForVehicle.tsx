import { VehicleForm } from '@/schema/vehicleSchema'
import { FormForProps } from './FormForTreecluster'
import FormError from './FormError'
import PrimaryButton from '../buttons/PrimaryButton'
import Input from './types/Input'
import Textarea from './types/Textarea'
import Select from './types/Select'
import { VehicleTypeOptions } from '@/hooks/useDetailsForVehicleType'
import { DrivingLicenseOptions } from '@/hooks/useDetailsForDrivingLicense'
import { VehicleStatusOptions } from '@/hooks/useDetailsForVehicleStatus'

interface FormForVehicleProps extends FormForProps<VehicleForm> {}

const FormForVehicle = (props: FormForVehicleProps) => {
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
      <Textarea
        placeholder="Hier ist Platz für Notizen"
        label="Kurze Beschreibung"
        error={errors.description?.message}
        {...props.register('description')}
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
      
      <FormError
        show={props.displayError}
        error="Es ist leider ein Problem aufgetreten. Bitte probieren Sie es erneut oder wenden Sie sich an einen Systemadministrierenden."
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
