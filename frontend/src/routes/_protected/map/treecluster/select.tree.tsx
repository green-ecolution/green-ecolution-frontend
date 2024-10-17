import MapSelectTreesModal from '@/components/map/MapSelectTreesModal'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Tree } from '@green-ecolution/backend-client'
import { useCallback, useState } from 'react'
import SelectedCard from '@/components/general/cards/SelectedCard'
import useFormStore, { FormStore } from '@/store/form/useFormStore'
import { TreeclusterSchema } from '@/schema/treeclusterSchema'
import { WithAllTrees } from '@/components/map/TreeMarker'
import { useSuspenseQuery } from '@tanstack/react-query'
import { treeQuery } from '@/api/queries'

export const Route = createFileRoute('/_protected/map/treecluster/select/tree')(
  {
    component: SelectTrees,
    meta: () => [{ title: 'Bäume auswählen' }],
  }
)

function SelectTrees() {
  const { form, storeTreeIds, set, type } = useFormStore(
    (state: FormStore<TreeclusterSchema>) => ({
      form: state.form,
      storeTreeIds: state.form?.treeIds ?? [],
      set: state.commit,
      type: state.type,
    })
  )
  const [treeIds, setTreeIds] = useState<number[]>(storeTreeIds)
  const [showError, setShowError] = useState(false)
  const navigate = useNavigate({ from: Route.fullPath })
  const { clusterId } = Route.useSearch()
  const { data: trees } = useSuspenseQuery(treeQuery())

  const handleNavigateBack = useCallback(() => {
    switch (type) {
      case 'new':
        return navigate({
          to: '/treecluster/new',
          search: { resetStore: false },
        })
      case 'edit':
        return navigate({
          to: `/treecluster/$treecluster/edit`,
          params: { treecluster: clusterId?.toString() ?? '' },
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
    form &&
      set({
        ...form,
        treeIds,
      })

    handleNavigateBack()
  }

  const handleCancel = () => handleNavigateBack()

  const handleDeleteTree = (treeId: number) => {
    setTreeIds((prev) => prev.filter((id) => id !== treeId))
  }

  const handleTreeClick = (tree: Tree) => {
    if (treeIds.includes(tree.id)) {
      setTreeIds((prev) => prev.filter((id) => id !== tree.id))
    } else {
      setTreeIds((prev) => [...prev, tree.id])
    }
  }

  return (
    <>
      <MapSelectTreesModal
        onSave={handleSave}
        onCancel={handleCancel}
        disabled={treeIds.length === 0}
        title="Ausgewählte Bäume:"
        content={
          <ul className="space-y-3">
            {(treeIds?.length || 0) === 0 || showError ? (
              <li className="text-red font-semibold text-sm">
                <p>Bitte wählen Sie mindestens einen Baum aus.</p>
              </li>
            ) : (
              treeIds.map((treeId, key) => (
                <li key={key}>
                  <SelectedCard treeId={treeId} onClick={handleDeleteTree} />
                </li>
              ))
            )}
          </ul>
        }
      />
      <WithAllTrees
        selectedTrees={treeIds}
        onClick={handleTreeClick}
      />
    </>
  )
}
