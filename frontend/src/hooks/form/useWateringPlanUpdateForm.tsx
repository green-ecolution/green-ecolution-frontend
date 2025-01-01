import { useMutation } from '@tanstack/react-query'
import { SubmitHandler } from 'react-hook-form'
import { wateringPlanApi } from '@/api/backendApi'
import { WateringPlan, WateringPlanUpdate } from '@green-ecolution/backend-client'
import { useFormSync } from '@/hooks/form/useFormSync'
import { WateringPlanForm, WateringPlanSchema } from '@/schema/wateringPlanSchema'
import { zodResolver } from '@hookform/resolvers/zod'

interface WateringPlanUpdateFormProps {
  wateringPlanId: string
  onUpdateSuccess: (data: WateringPlan) => void
  onUpdateError: () => void
  initialFormData: WateringPlanForm | undefined
}

export const useWateringPlanUpdateForm = ({
  wateringPlanId,
  onUpdateSuccess,
  onUpdateError,
  initialFormData,
}: WateringPlanUpdateFormProps) => {
  const { register, handleSubmit, formState, watch } = useFormSync<WateringPlanForm>(
    initialFormData,
    zodResolver(WateringPlanSchema(false))
  )

  const { isError, mutate } = useMutation({
    mutationFn: (body: WateringPlanUpdate) =>
      wateringPlanApi.updateWateringPlan({ id: wateringPlanId, body }),
    onSuccess: onUpdateSuccess,
    onError: onUpdateError,
    throwOnError: true,
  })

  const onSubmit: SubmitHandler<WateringPlanForm> = async (data) => {
    mutate({
      ...data,
      date: data.date.toISOString(),
      usersIds: [], // TODO: add user ids
    })
  }

  return { register, handleSubmit, formState, watch, onSubmit, isError }
}
