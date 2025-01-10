import { useMutation, useQueryClient } from '@tanstack/react-query'
import { wateringPlanIdQuery, wateringPlanQuery } from '@/api/queries'
import useToast from '@/hooks/useToast'
import { useNavigate } from '@tanstack/react-router'
import { WateringPlan, WateringPlanCreate, WateringPlanUpdate } from '@green-ecolution/backend-client'
import { wateringPlanApi } from '@/api/backendApi'
import useFormStore, { FormStore } from '@/store/form/useFormStore'
import { WateringPlanForm } from '@/schema/wateringPlanSchema'

export const useWaterinPlanForm = (mutationType: 'create' | 'update', wateringPlanId?: string) => {
  const showToast = useToast()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const formStore = useFormStore((state: FormStore<WateringPlanForm>) => ({
    form: state.form,
    reset: state.reset,
  }))

  const { mutate, isError, error } = useMutation({
    mutationFn: (wateringPlan: WateringPlanCreate | WateringPlanUpdate) => {
      if (mutationType === 'create') {
        return wateringPlanApi.createWateringPlan({
          body: wateringPlan as WateringPlanCreate,
        })
      } else if (mutationType === 'update' && wateringPlanId) {
        return wateringPlanApi.updateWateringPlan({
          id: wateringPlanId,
          body: wateringPlan as WateringPlanUpdate,
        })
      }
      return Promise.reject('Invalid mutation type or missing wateringPlanId for update')
    },

    onSuccess: (data: WateringPlan) => {
      formStore.reset()
      queryClient.invalidateQueries(wateringPlanIdQuery(String(data.id)))
      queryClient.invalidateQueries(wateringPlanQuery())
      navigate({
        to: `/watering-plans/$wateringPlanId`,
        params: { wateringPlanId: data.id.toString() },
        search: { resetStore: false },
        replace: true,
      })
      mutationType === 'create'
        ? showToast('Der Einsatzplan wurde erfolgreich erstellt.')
        : showToast('Der Einsatzplan wurde erfolgreich bearbeitet.');
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
