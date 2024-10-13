import MapSelectTreesModal from '@/components/map/MapSelectTreesModal'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { LatLng } from 'leaflet'
import { useRef, useState } from 'react'
import { useMapMouseSelect } from '@/hooks/useMapMouseSelect'
import { DragableMarker } from '@/components/map/MapMarker'
import { WithTreesAndClusters } from '@/components/map/TreeMarker'
import { useSuspenseQuery } from '@tanstack/react-query'
import { treeClusterQuery, treeQuery } from '@/api/queries'

export const Route = createFileRoute('/_protected/map/tree/new')({
  component: NewTree,
  meta: () => [{ title: 'Neuer Baum' }],
})

function NewTree() {
  const [treeLatLng, setTreeLatLng] = useState<LatLng>()
  const navigate = useNavigate({ from: Route.fullPath })
  const modalRef = useRef<HTMLDivElement>(null)
  useMapMouseSelect((latlng, e) => {
    const target = e.originalEvent.target as HTMLElement
    if (!modalRef.current?.contains(target)) {
      setTreeLatLng(latlng)
    }
  })
  const { data: cluster } = useSuspenseQuery(treeClusterQuery())
  const { data: trees } = useSuspenseQuery(treeQuery())

  const handleSave = () => {
    if (!treeLatLng) return
    navigate({
      to: '/tree/new',
      search: { lat: treeLatLng!.lat, lng: treeLatLng!.lng, resetStore: true },
    })
  }

  const handleCancel = () => {
    navigate({ to: '/map', search: (prev) => prev })
  }

  return (
    <>
      <WithTreesAndClusters clusters={cluster.data} trees={trees.data} />
      <MapSelectTreesModal
        ref={modalRef}
        onSave={handleSave}
        onCancel={handleCancel}
        title="Baum erfassen:"
        disabled={!treeLatLng}
        content={
          <ul className="space-y-3">
            <li className="text-dark-600">
              {treeLatLng ? (
                <>
                  <p>Neuer Baum an folgendem Standort:</p>
                  {treeLatLng?.lat}, {treeLatLng?.lng}
                </>
              ) : (
                <p>Bitte wähle einen Standort für den neuen Baum.</p>
              )}
            </li>
          </ul>
        }
      />

      {treeLatLng && (
        <DragableMarker
          position={treeLatLng}
          onMove={(latlng) => setTreeLatLng(latlng)}
        />
      )}
    </>
  )
}
