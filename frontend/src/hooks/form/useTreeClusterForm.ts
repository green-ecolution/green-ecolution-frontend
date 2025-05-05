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
          clusterId: Number(clusterId),
          body: cluster as TreeClusterUpdate,
        });
      }
      return Promise.reject(Error('Invalid mutation type or missing clusterId for update'))
    },

    onSuccess: (data: TreeCluster) => {
      formStore.reset()
      queryClient.invalidateQueries(treeClusterIdQuery(String(data.id))).catch((error) => console.error('Invalidate "treeClusterIdQuery" failed:', error));
      queryClient.invalidateQueries(treeClusterQuery()).catch((error) => console.error('Invalidate "treeClusterQuery" failed:', error));
      navigate({
        to: '/treecluster/$treeclusterId',
        params: { treeclusterId: data.id.toString() },
        search: { resetStore: false },
        replace: true,
      }).catch((error) => console.error('Navigation failed:', error));

      if (mutationType === 'create')
        showToast('Die Bewässerungsgruppe wurde erfolgreich erstellt.')
      else
        showToast('Die Bewässerungsgruppe wurde erfolgreich bearbeitet.');
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
