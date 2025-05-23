import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Tree } from '@green-ecolution/backend-client'
import { useCallback, useState } from 'react'
import SelectedCard from '@/components/general/cards/SelectedCard'
import useFormStore, { FormStore } from '@/store/form/useFormStore'
import { TreeclusterForm } from '@/schema/treeclusterSchema'
import WithAllTrees from '@/components/map/marker/WithAllTrees'
import MapSelectEntitiesModal from '@/components/map/MapSelectEntitiesModal'

export const Route = createFileRoute('/_protected/map/treecluster/select/tree/')({
  component: SelectTrees,
})

function SelectTrees() {
  const { form, storeTreeIds, set, type } = useFormStore((state: FormStore<TreeclusterForm>) => ({
    form: state.form,
    storeTreeIds: state.form?.treeIds ?? [],
    set: state.commit,
    type: state.type,
  }))
  const [treeIds, setTreeIds] = useState<number[]>(storeTreeIds)
  const [showError, setShowError] = useState(false)
  const navigate = useNavigate({ from: Route.fullPath })
  const { clusterId } = Route.useSearch()

  const handleNavigateBack = useCallback(() => {
    switch (type) {
      case 'new':
        return navigate({
          to: '/treecluster/new',
          search: { resetStore: false },
        })
      case 'edit':
        return navigate({
          to: `/treecluster/$treeclusterId/edit`,
          params: { treeclusterId: clusterId?.toString() ?? '' },
          search: { resetStore: false },
        })
      default:
        return navigate({
          to: '/treecluster/new',
          search: { resetStore: false },
        })
    }
  }, [navigate, type, clusterId])

  const handleSave = () => {
    if (treeIds.length === 0) {
      setShowError(true)
      return
    }
    if (form) {
      set({
        ...form,
        treeIds,
      })
    }

    handleNavigateBack().catch((error) => console.error('Navigation failed:', error))
  }

  const handleCancel = () => handleNavigateBack()

  const handleDeleteTree = (treeId: number) => {
    setTreeIds((prev) => prev.filter((id) => id !== treeId))
  }

  const handleTreeClick = (tree: Tree) => {
    if (treeIds.includes(tree.id)) setTreeIds((prev) => prev.filter((id) => id !== tree.id))
    else setTreeIds((prev) => [...prev, tree.id])
  }

  return (
    <>
      <MapSelectEntitiesModal
        onSave={handleSave}
        onCancel={() => void handleCancel()}
        disabled={treeIds.length === 0}
        title="Ausgewählte Bäume:"
        content={
          <ul>
            {(treeIds?.length || 0) === 0 || showError ? (
              <li className="text-dark-600 font-semibold text-sm">
                <p>Hier kannst du zugehörige Bäume verlinken.</p>
              </li>
            ) : (
              treeIds.map((treeId) => (
                <li key={treeId}>
                  <SelectedCard type="tree" id={treeId} onClick={handleDeleteTree} />
                </li>
              ))
            )}
          </ul>
        }
      />
      <WithAllTrees selectedTrees={treeIds} onClick={handleTreeClick} />
    </>
  )
}
