import { useMutation } from '@tanstack/react-query'
import BackLink from '../general/links/BackLink'
import DeleteSection from '../treecluster/DeleteSection'
import {
  Vehicle,
  VehicleUpdate as UpdateVehicle,
} from '@green-ecolution/backend-client'
import { useInitFormQuery } from '@/hooks/form/useInitForm'
import { vehicleIdQuery } from '@/api/queries'
import { vehicleApi } from '@/api/backendApi'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler } from 'react-hook-form'
import { Suspense } from 'react'
import LoadingInfo from '../general/error/LoadingInfo'
import { VehicleForm, VehicleSchema } from '@/schema/vehicleSchema'
import FormForVehicle from '../general/form/FormForVehicle'
import { useFormSync } from '@/hooks/form/useFormSync'
import useFormStore, { FormStore } from '@/store/form/useFormStore'

interface VehicleUpdateProps {
  vehicleId: string
  onUpdateSuccess: (data: Vehicle) => void
  onUpdateError: () => void
}

const VehicleUpdate = ({
  vehicleId,
  onUpdateError,
  onUpdateSuccess,
}: VehicleUpdateProps) => {
  const { initForm, loadedData } = useInitFormQuery<Vehicle, VehicleForm>(
    vehicleIdQuery(vehicleId),
    (data) => ({
      numberPlate: data.numberPlate,
      type: data.type,
      drivingLicense: data.drivingLicense,
      status: data.status,
      height: data.height,
      width: data.width,
      length: data.length,
      model: data.model,
      waterCapacity: data.waterCapacity,
      description: data.description,
    })
  )

  const formStore = useFormStore((state: FormStore<VehicleForm>) => ({
    form: state.form,
    reset: state.reset,
  }))
  
  const { register, handleSubmit, formState } = useFormSync<VehicleForm>(
    initForm,
    zodResolver(VehicleSchema)
  )

  const { isError, mutate } = useMutation({
    mutationFn: (body: UpdateVehicle) =>
      vehicleApi.updateVehicle({ id: vehicleId, body }),
    onSuccess: (data) => onUpdateSuccess(data),
    onError: () => onUpdateError(),
    throwOnError: true,
  })

  const onSubmit: SubmitHandler<VehicleForm> = async (data) => {
    mutate({
      ...data,
      description: formStore.form?.description ?? '',
    })
  }

  const handleDeleteVehicle = () => {
    return vehicleApi.deleteVehicle({
      id: String(vehicleId),
    })
  }

  return (
    <>
      <article className="2xl:w-4/5">
        <BackLink
          label="Zurück zur Fahrzeugübersicht"
          link={{
            to: `/vehicles/$vehicleId`,
            params: { vehicleId: vehicleId?.toString() ?? '' },
          }}
        />
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Fahrzeug {loadedData?.numberPlate} bearbeiten
        </h1>
        <p className="mb-5">Hier können Sie das Fahrzeug bearbeiten.</p>
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

      <Suspense fallback={<LoadingInfo label="Das Fahrzeug wird gelöscht" />}>
        <DeleteSection
          mutationFn={handleDeleteVehicle}
          entityName="das Fahrzeug"
          redirectUrl={{ to: '/vehicles' }}
        />
      </Suspense>
    </>
  )
}

export default VehicleUpdate
