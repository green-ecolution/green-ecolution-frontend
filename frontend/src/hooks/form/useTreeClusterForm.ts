import { useMutation, useQueryClient } from '@tanstack/react-query'
import { vehicleQuery } from '@/api/queries'
import useToast from '@/hooks/useToast'
import { useNavigate } from '@tanstack/react-router'
import { TreeCluster, TreeClusterCreate } from '@green-ecolution/backend-client'
import { clusterApi } from '@/api/backendApi'
import useFormStore, { FormStore } from '@/store/form/useFormStore'
import { TreeclusterForm } from '@/schema/treeclusterSchema'

export const useTreeClusterForm = (mutationType: 'create' | 'update', clusterId?: string) => {
  const showToast = useToast()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const formStore = useFormStore((state: FormStore<TreeclusterForm>) => ({
    form: state.form,
    reset: state.reset,
  }))

  const { mutate, isError, error } = useMutation({
    mutationFn: (cluster: TreeClusterCreate) => {
      console.log('Mutation Request:', cluster)
      if (mutationType === 'create') {
        return clusterApi.createTreeCluster({
          body: cluster,
        })
      } else if (mutationType === 'update' && clusterId) {
        return clusterApi.updateTreeCluster({
          clusterId: clusterId,
          body: cluster,
        })
      }
      return Promise.reject('Invalid mutation type or missing clusterId for update')
    },

    onSuccess: (data: TreeCluster) => {
      console.log('Mutation Success Response:', data)
      formStore.reset()
      if (mutationType === 'create') {
        showToast('Die Bewässerungsgruppe wurde erfolgreich erstellt.')
        navigate({
          to: `/treecluster/${data.id}`,
          search: { resetStore: false },
          replace: true,
        })
      } else if (mutationType === 'update') {
        showToast('Die Bewässerungsgruppe wurde erfolgreich bearbeitet.')
        navigate({
          to: `/treecluster/${data.id}`,
          search: { resetStore: false },
          replace: true,
        })
      }
      queryClient.invalidateQueries(vehicleQuery())
    },

    onError: (error) => {
      console.error('Error with tree cluster mutation:', error)
      showToast(`Fehlermeldung: ${error.message || 'Unbekannter Fehler'}`, 'error')
    },
    throwOnError: true,
  })

  return {
    mutate: mutate,
    isError: isError,
    error: error,
    formStore: formStore,
  }
}
