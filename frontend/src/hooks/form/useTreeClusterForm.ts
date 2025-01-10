import { useMutation, useQueryClient } from '@tanstack/react-query'
import { treeClusterIdQuery, treeClusterQuery } from '@/api/queries'
import useToast from '@/hooks/useToast'
import { useNavigate } from '@tanstack/react-router'
import { TreeCluster, TreeClusterCreate, TreeClusterUpdate } from '@green-ecolution/backend-client'
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
    mutationFn: (cluster: TreeClusterCreate | TreeClusterUpdate) => {
      if (mutationType === 'create') {
        return clusterApi.createTreeCluster({
          body: cluster as TreeClusterCreate,
        });
      } else if (mutationType === 'update' && clusterId) {
        return clusterApi.updateTreeCluster({
          clusterId: clusterId,
          body: cluster as TreeClusterUpdate,
        });
      }
      return Promise.reject('Invalid mutation type or missing clusterId for update')
    },

    onSuccess: (data: TreeCluster) => {
      formStore.reset()
      queryClient.invalidateQueries(treeClusterIdQuery(String(data.id)))
      queryClient.invalidateQueries(treeClusterQuery())
      navigate({
        to: '/treecluster/$treeclusterId',
        params: { treeclusterId: data.id.toString() },
        search: { resetStore: false },
        replace: true,
      })
      mutationType === 'create'
        ? showToast('Die Bewässerungsgruppe wurde erfolgreich erstellt.')
        : showToast('Die Bewässerungsgruppe wurde erfolgreich bearbeitet.');
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
