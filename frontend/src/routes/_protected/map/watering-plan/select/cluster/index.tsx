import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { TreeCluster } from '@green-ecolution/backend-client'
import { useCallback, useMemo, useState } from 'react'
import useFormStore, { FormStore } from '@/store/form/useFormStore'
import { WateringPlanForm } from '@/schema/wateringPlanSchema'
import MapSelectEntitiesModal from '@/components/map/MapSelectEntitiesModal'
import WithAllClusters from '@/components/map/marker/WithAllClusters'
import ShowRoutePreview from '@/components/map/marker/ShowRoutePreview'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { treeClusterQuery, vehicleIdQuery } from '@/api/queries'
import Notice from '@/components/general/Notice'
import SelectedCard from '@/components/general/cards/SelectedCard'

export const Route = createFileRoute(
  '/_protected/map/watering-plan/select/cluster/'
)({
  component: SelectCluster,
  loader: ({ context: { queryClient } }) => {
    return queryClient.prefetchQuery(treeClusterQuery())
  }
})

function SelectCluster() {
  const { form, storeClusterIds, set, type } = useFormStore(
    (state: FormStore<WateringPlanForm>) => ({
      form: state.form,
      storeClusterIds: state.form?.treeClusterIds ?? [],
      set: state.commit,
      type: state.type,
    })
  )
  const [clusterIds, setClusterIds] = useState<number[]>(storeClusterIds)
  const [showError, setShowError] = useState(false)
  const navigate = useNavigate({ from: Route.fullPath })
  const { wateringPlanId } = Route.useSearch()
  const { data: clusters } = useSuspenseQuery(treeClusterQuery())
  const { data: transporter } = useQuery({
    ...vehicleIdQuery(form?.transporterId.toString() ?? '-1'),
    enabled: !!form?.transporterId && form?.transporterId !== -1,
  })
  const { data: trailer } = useQuery({
    ...vehicleIdQuery(form?.trailerId?.toString() ?? '-1'),
    enabled: !!form?.trailerId && form?.trailerId !== -1,
  })

  const handleNavigateBack = useCallback(() => {
    switch (type) {
      case 'edit':
        return navigate({
          to: `/watering-plans/$wateringPlanId/edit`,
          params: { wateringPlanId: String(wateringPlanId) },
          search: { resetStore: false },
        })
      case 'new':
        return navigate({
          to: '/watering-plans/new',
          search: { resetStore: false },
        })
      default:
        return navigate({
          to: '/watering-plans/new',
          search: { resetStore: false },
        })
    }
  }, [navigate, type, wateringPlanId])

  const handleSave = () => {
    if (clusterIds.length === 0) {
      setShowError(true)
      return
    }

    if (form) {
      set({
        ...form,
        treeClusterIds: clusterIds,
      })

      handleNavigateBack().catch((error) => console.error('Navigation failed:', error))
    }
  }

  const handleDelete = (clusterId: number) => {
    setClusterIds((prev) => prev.filter((id) => id !== clusterId))
  }

  const handleClick = (cluster: TreeCluster) => {
    if (disabledClusters.includes(cluster.id)) return

    if (clusterIds.includes(cluster.id))
      setClusterIds((prev) => prev.filter((id) => id !== cluster.id))
    else
      setClusterIds((prev) => [...prev, cluster.id])
  }

  const disabledClusters = useMemo(() => {
    if (!transporter) return clusters.data.map((cluster) => cluster.id)

    const totalCapacity = trailer
      ? transporter.waterCapacity + trailer.waterCapacity
      : transporter.waterCapacity

    return clusters.data
      .filter((cluster) => {
        const neededWater = (cluster.treeIds?.length ?? 0) * 80
        return neededWater > totalCapacity
      })
      .map((cluster) => cluster.id)
  }, [transporter, trailer, clusters.data])

  const { showNotice, notice } = useMemo(() => {
    const errors = []

    if (!form?.transporterId || form?.transporterId === -1) {
      errors.push(
        'Um eine Route generieren zu können, muss ein Fahrzeug ausgewählt werden.'
      )
    }

    if (disabledClusters.length > 0) {
      errors.push(
        'Ausgegraute Bewässerungsgruppen sind ausgeschlossen, da das Fahrzeug nicht genügend Wasserkapazität hat.'
      )
    }

    return {
      showNotice: errors.length > 0,
      notice: errors,
    }
  }, [form?.transporterId, disabledClusters])

  return (
    <>
      <MapSelectEntitiesModal
        onSave={handleSave}
        onCancel={() => void handleNavigateBack()}
        disabled={clusterIds.length === 0}
        title="Ausgewählte Bewässerungsgruppen:"
        content={
          <ul>
            {showNotice && (
              <Notice classes="mb-4" description={notice.join(' ')} />
            )}
            {(clusterIds?.length || 0) === 0 || showError ? (
              <li className="text-dark-600 font-semibold text-sm">
                <p>Hier können Sie zugehörigen Gruppen verlinken.</p>
              </li>
            ) : (
              clusterIds.map((clusterId) => (
                <li key={clusterId}>
                  <SelectedCard
                    type="cluster"
                    id={clusterId}
                    onClick={handleDelete}
                  />
                </li>
              ))
            )}
          </ul>
        }
      />
      <WithAllClusters
        onClick={handleClick}
        highlightedClusters={clusterIds}
        disabledClusters={disabledClusters}
      />

      {clusterIds.length > 0 &&
        form?.transporterId &&
        form?.transporterId != -1 && (
          <ShowRoutePreview
            selectedClustersIds={clusterIds}
            transporterId={form?.transporterId}
            trailerId={form.trailerId}
          />
        )}
    </>
  )
}
