import {
  VehicleType,
  DrivingLicense,
  VehicleStatus,
} from '@green-ecolution/backend-client'
import FormForVehicle from '@/components/general/form/FormForVehicle'
import BackLink from '@/components/general/links/BackLink'
import { useFormSync } from '@/hooks/form/useFormSync'
import { useInitForm } from '@/hooks/form/useInitForm'
import { VehicleForm, VehicleSchema } from '@/schema/vehicleSchema'
import useFormStore from '@/store/form/useFormStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute } from '@tanstack/react-router'
import { useVehicleForm } from '@/hooks/form/useVehicleForm'

export const Route = createFileRoute('/_protected/vehicles/_formular/new')({
  beforeLoad: () => {
    useFormStore.getState().setType('new')
  },
  component: NewVehicle,
  meta: () => [{ title: 'Neues Fahrzeug' }],
})

function NewVehicle() {
  const { mutate, isError, error } = useVehicleForm('create')
  const { initForm } = useInitForm<VehicleForm>({
    numberPlate: '',
    type: VehicleType.VehicleTypeUnknown,
    drivingLicense: DrivingLicense.DrivingLicenseCar,
    status: VehicleStatus.VehicleStatusUnknown,
    height: 1,
    width: 1,
    length: 1,
    weight: 1,
    model: '',
    waterCapacity: 1,
    description: '',
  })

  const { register, handleSubmit, formState } = useFormSync<VehicleForm>(
    initForm,
    zodResolver(VehicleSchema)
  )

  const onSubmit = (data: VehicleForm) => {
    mutate({...data})
  }

  return (
    <div className="container mt-6">
      <article className="2xl:w-4/5">
        <BackLink link={{ to: '/vehicles' }} label="Zu allen Fahrzeugen" />
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Neues Fahrzeug erstellen
        </h1>
        <p className="mb-5">
          In dieser Ansicht können Sie ein neues Fahrzeug anlegen. Bitte
          beachten Sie, dass jedes Fahrzeug ein eindeutiges Kennzeichen besitzen
          muss, da keine doppelten Kennzeichen erlaubt sind. Zusätzlich müssen
          die Abmessungen des Fahrzeugs hinterlegt werden, damit das
          Navigationssystem bei einer Bewässerungsfahrt ermitteln kann, welche
          Strecken für das Fahrzeug befahrbar sind.
        </p>
      </article>

      <section className="mt-10">
        <FormForVehicle
          register={register}
          handleSubmit={handleSubmit}
          formState={formState}
          onSubmit={onSubmit}
          displayError={isError}
          errorMessage={error?.message}
        />
      </section>
    </div>
  )
}
