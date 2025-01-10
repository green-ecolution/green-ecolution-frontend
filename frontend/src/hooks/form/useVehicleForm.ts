import { useMutation, useQueryClient } from '@tanstack/react-query'
import { vehicleQuery } from '@/api/queries'
import useToast from '@/hooks/useToast'
import { useNavigate } from '@tanstack/react-router'
import { Vehicle, VehicleCreate } from '@green-ecolution/backend-client'
import { vehicleApi } from '@/api/backendApi'
import useFormStore, { FormStore } from '@/store/form/useFormStore'
import { VehicleForm } from '@/schema/vehicleSchema'

export const useVehicleForm = (mutationType: 'create' | 'update', vehicleId?: string) => {
  const showToast = useToast()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const formStore = useFormStore((state: FormStore<VehicleForm>) => ({
    form: state.form,
    reset: state.reset,
  }))

  const { mutate, isError, error } = useMutation({
    mutationFn: (vehicle: VehicleCreate) => {
      if (mutationType === 'create') {
        return vehicleApi.createVehicle({
          body: vehicle,
        })
      } else if (mutationType === 'update' && vehicleId) {
        return vehicleApi.updateVehicle({
          id: vehicleId,
          body: vehicle,
        })
      }
      return Promise.reject('Invalid mutation type or missing vehicleId for update')
    },

    onSuccess: (data: Vehicle) => {
      formStore.reset()
      if (mutationType === 'create') {
        showToast('Das Fahrzeug wurde erfolgreich erstellt.')
        navigate({
          to: `/vehicles/${data.id}`,
          search: { resetStore: false },
          replace: true,
        })
      } else if (mutationType === 'update') {
        showToast('Das Fahrzeug wurde erfolgreich bearbeitet.')
        navigate({
          to: `/vehicles/${data.id}`,
          search: { resetStore: false },
          replace: true,
        })
      }
      queryClient.invalidateQueries(vehicleQuery())
    },

    onError: (error) => {
      console.error('Error with vehicle mutation:', error)
      showToast(`Fehlermeldung: ${error.message || 'Unbekannter Fehler'}`, 'error')
    },
    throwOnError: true,
  })

  return {
    mutate: mutate,
    isError: isError,
    error: error,
  }
}
