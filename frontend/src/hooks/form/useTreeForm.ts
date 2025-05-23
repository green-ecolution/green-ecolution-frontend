import { useMutation, useQueryClient } from '@tanstack/react-query'
import { treeClusterIdQuery, treeIdQuery, treeQuery } from '@/api/queries'
import useToast from '@/hooks/useToast'
import { useNavigate } from '@tanstack/react-router'
import { Tree, TreeCreate, TreeUpdate } from '@green-ecolution/backend-client'
import { treeApi } from '@/api/backendApi'
import useFormStore, { FormStore } from '@/store/form/useFormStore'
import { TreeForm } from '@/schema/treeSchema'

export const useTreeForm = (mutationType: 'create' | 'update', treeId?: string) => {
  const showToast = useToast()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const formStore = useFormStore((state: FormStore<TreeForm>) => ({
    form: state.form,
    reset: state.reset,
  }))

  const { mutate, isError, error } = useMutation({
    mutationFn: (tree: TreeCreate | TreeUpdate) => {
      if (mutationType === 'create') {
        return treeApi.createTree({
          body: tree as TreeCreate,
        })
      } else if (mutationType === 'update' && treeId) {
        return treeApi.updateTree({
          treeId: Number(treeId),
          body: tree as TreeUpdate,
        })
      }
      return Promise.reject(Error('Invalid mutation type or missing treeId for update'))
    },

    onSuccess: (data: Tree) => {
      formStore.reset()
      queryClient
        .invalidateQueries(treeIdQuery(String(data.id)))
        .catch((error) => console.error('Invalidate "treeIdQuery" failed:', error))
      queryClient
        .invalidateQueries(treeQuery())
        .catch((error) => console.error('Invalidate "treeQuery" failed:', error))
      if (data.treeClusterId) {
        queryClient
          .invalidateQueries(treeClusterIdQuery(String(data.treeClusterId)))
          .catch((error) => console.error('Invalidate "treeClusterIdQuery" failed:', error))
      }
      navigate({
        to: '/trees/$treeId',
        params: { treeId: data.id.toString() },
        search: { resetStore: false },
        replace: true,
      }).catch((error) => console.error('Navigation failed:', error))

      const msg =
        mutationType === 'create'
          ? 'Der Baum wurde erfolgreich erstellt.'
          : 'Der Baum wurde erfolgreich bearbeitet.'
      showToast(msg)
    },

    onError: (error) => {
      console.error('Error with tree mutation:', error)
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
