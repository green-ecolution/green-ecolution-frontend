import SelectedCard from '@/components/general/cards/SelectedCard'
import MapSelectTreesModal from '@/components/map/MapSelectTreesModal'
import WithAllTrees from '@/components/map/marker/WithAllTrees'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useCallback, useState } from 'react'

export const Route = createFileRoute('/_protected/map/sensor/select/tree')(
  {
    component: LinkTreeToSensor,
    meta: () => [{ title: 'Vegetation verlinken' }],
  }
)


function LinkTreeToSensor() {
  const [treeIds, setTreeIds] = useState<number[]>()
  const [showError, setShowError] = useState(false)
  const navigate = useNavigate({ from: Route.fullPath })
  const { sensorId } = Route.useSearch()

  const handleNavigateBack = useCallback(() => {
    return navigate({
      to: `/sensors/$sensorId`,
      params: { sensorId: sensorId?.toString() ?? '' },
      search: { resetStore: false },
    })
   }, [navigate, sensorId])

  const handleSave = () => {
    if (treeIds.length === 0) {
      setShowError(true)
      return
    }
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
              <li className="text-dark-600 font-semibold text-sm">
                <p>Hier können Sie zugehörige Bäume verlinken.</p>
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