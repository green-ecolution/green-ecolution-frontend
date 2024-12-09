import { sensorIdQuery } from '@/api/queries'
import SelectedCard from '@/components/general/cards/SelectedCard'
import MapSelectTreesModal from '@/components/map/MapSelectTreesModal'
import SensorMarker from '@/components/map/marker/SensorMarker'
import WithAllTrees from '@/components/map/marker/WithAllTrees'
import { Tree } from '@green-ecolution/backend-client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useCallback, useState } from 'react'

export const Route = createFileRoute('/_protected/map/sensor/select/tree')({
  component: LinkTreeToSensor,
  meta: () => [{ title: 'Vegetation verlinken' }],
})

function LinkTreeToSensor() {
  const [treeId, setTreeId] = useState<number | undefined>()
  const [showError, setShowError] = useState(false)
  const navigate = useNavigate({ from: Route.fullPath })
  const { sensorId } = Route.useSearch()
  const { data: sensor } = useSuspenseQuery(sensorIdQuery(String(sensorId)))

  const handleNavigateBack = useCallback(() => {
    return navigate({
      to: `/sensors/$sensorId`,
      params: { sensorId: sensorId?.toString() ?? '' },
      search: { resetStore: false },
    })
  }, [navigate, sensorId])

  const handleSave = () => {
    if (!treeId) {
      setShowError(true)
      return
    }
    handleNavigateBack()
  }

  return (
    <>
      <MapSelectTreesModal
        onSave={handleSave}
        onCancel={() => handleNavigateBack()}
        disabled={!treeId}
        title="Ausgewählte Bäume:"
        content={
          <>
            {!treeId || showError ? (
              <p className="text-dark-600 font-semibold text-sm">
                Hier können Sie die zugehörige Vegetation verlinken.
              </p>
            ) : (
              <SelectedCard treeId={treeId} onClick={() => setTreeId(undefined)} />
            )}
          </>
        }
      />
      <WithAllTrees selectedTrees={treeId ? [treeId] : []} onClick={(tree: Tree) => setTreeId(tree.id)} />
      <SensorMarker
        sensor={sensor}
      />
    </>
  )
}
