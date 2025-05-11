import BackLink from '../general/links/BackLink'
import DeleteSection from '../treecluster/DeleteSection'
import { Vehicle } from '@green-ecolution/backend-client'
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
import { useVehicleForm } from '@/hooks/form/useVehicleForm'

interface VehicleUpdateProps {
  vehicleId: string
}

const VehicleUpdate = ({ vehicleId }: VehicleUpdateProps) => {
  const { mutate, isError, error } = useVehicleForm('update', vehicleId)
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
      weight: data.weight,
      model: data.model,
      waterCapacity: data.waterCapacity,
      description: data.description,
    }),
  )

  const { register, handleSubmit, formState } = useFormSync<VehicleForm>(
    initForm,
    zodResolver(VehicleSchema),
  )

  const onSubmit: SubmitHandler<VehicleForm> = (data) => {
    mutate({ ...data })
  }

  const handleArchiveVehicle = () => {
    return vehicleApi.archiveVehicle({
      id: Number(vehicleId),
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
        <p className="mb-5">Hier kannst du das Fahrzeug bearbeiten.</p>
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

      <Suspense fallback={<LoadingInfo label="Das Fahrzeug wird gelöscht" />}>
        <DeleteSection
          mutationFn={handleArchiveVehicle}
          type="archive"
          entityName="das Fahrzeug"
          redirectUrl={{ to: '/vehicles' }}
        />
      </Suspense>
    </>
  )
}

export default VehicleUpdate
