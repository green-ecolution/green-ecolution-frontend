import { vehicleApi, VehicleCreate } from '@/api/backendApi'
import {
  VehicleType,
  DrivingLicense,
  VehicleStatus,
} from '@green-ecolution/backend-client'
import { vehicleQuery } from '@/api/queries'
import FormForVehicle from '@/components/general/form/FormForVehicle'
import BackLink from '@/components/general/links/BackLink'
import { useFormSync } from '@/hooks/form/useFormSync'
import { useInitForm } from '@/hooks/form/useInitForm'
import useToast from '@/hooks/useToast'
import { VehicleForm, VehicleSchema } from '@/schema/vehicleSchema'
import useFormStore, { FormStore } from '@/store/form/useFormStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/vehicles/_formular/new')({
  beforeLoad: () => {
    useFormStore.getState().setType('new')
  },
  component: NewVehicle,
  meta: () => [{ title: 'Neues Fahrzeug' }],
})

function NewVehicle() {
  const navigate = useNavigate({ from: Route.fullPath })
  const showToast = useToast()
  const queryClient = useQueryClient()

  const formStore = useFormStore((state: FormStore<VehicleForm>) => ({
    form: state.form,
    reset: state.reset,
  }))

  const { initForm } = useInitForm<VehicleForm>({
    numberPlate: '',
    type: VehicleType.VehicleTypeUnknown,
    drivingLicense: DrivingLicense.DrivingLicenseCar,
    status: VehicleStatus.VehicleStatusUnknown,
    height: 1,
    width: 1,
    length: 1,
    model: '',
    waterCapacity: 1,
    description: '',
  })

  const { register, handleSubmit, formState } = useFormSync<VehicleForm>(
    initForm,
    zodResolver(VehicleSchema)
  )

  const { isError, mutate } = useMutation({
    mutationFn: (vehicle: VehicleCreate) =>
      vehicleApi.createVehicle({
        body: vehicle,
      }),
    onSuccess: (data) => {
      formStore.reset()
      navigate({
        to: '/vehicles/$vehicleId',
        params: { vehicleId: data.id.toString() },
        search: { resetStore: false },
        replace: true,
      })
      queryClient.invalidateQueries(vehicleQuery())
      showToast('Das Fahrzeug wurde erfolgreich erstellt.')
    },
    onError: (error) => {
      console.error('Error creating vehicle:', error)
    },
  })

  const onSubmit = (data: VehicleForm) => {
    mutate({
      ...data,
      description: data.description ?? '',
    })
  }

  return (
    <div className="container mt-6">
      <article className="2xl:w-4/5">
        <BackLink link={{ to: '/vehicles' }} label="Zu allen Fahrzeugen" />
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Neues Fahrzeug erstellen
        </h1>
        <p className="mb-5">
          In dieser Ansicht können Sie ein neues Fahrzeug erstellen.
        </p>
      </article>

      <section className="mt-10">
        <FormForVehicle
          register={register}
          handleSubmit={handleSubmit}
          formState={formState}
          onSubmit={onSubmit}
          displayError={isError}
        />
      </section>
    </div>
  )
}
