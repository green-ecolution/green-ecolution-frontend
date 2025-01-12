import ZoomControls from '@/components/map/ZoomControls'
import { Suspense } from 'react'
import LoadingInfo from '@/components/general/error/LoadingInfo'
import ShowRoutePreview from '../map/marker/ShowRoutePreview'
import { WithTreesAndClusters } from '../map/marker/WithAllClusterAndTrees'
import { Tree, TreeCluster, WateringPlan } from '@green-ecolution/backend-client'
import { useNavigate } from '@tanstack/react-router'
import { MapContainer, TileLayer } from 'react-leaflet'
import useMapStore from '@/store/store'

interface WateringPlanPreviewRouteProps {
  wateringPlan: WateringPlan
}

const WateringPlanPreviewRoute = ({
  wateringPlan,
}: WateringPlanPreviewRouteProps) => {
  const { zoom, center, maxZoom, minZoom } = useMapStore((state) => ({
    zoom: state.map.zoom,
    center: state.map.center,
    maxZoom: state.map.maxZoom,
    minZoom: state.map.minZoom,
  }))
  const navigate = useNavigate({})

  const handleTreeClick = (tree: Tree) => {
    navigate({ to: `/tree/$treeId`, params: { treeId: tree.id.toString() } })
  }

  const handleClusterClick = (cluster: TreeCluster) => {
    navigate({
      to: `/treecluster/$treeclusterId`,
      params: { treeclusterId: cluster.id.toString() },
    })
  }

  return (
    <MapContainer
      key={new Date().getTime()}
      preferCanvas
      className="z-0"
      zoomControl={false}
      center={center}
      style={{ width: "100%", height: "40rem" }}
      zoom={zoom}
      maxZoom={maxZoom}
      minZoom={minZoom}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControls />
      <Suspense fallback={<LoadingInfo label='Lade Karte...' />}>
        <ShowRoutePreview
          selectedClustersIds={wateringPlan.treeclusters.map(tc => tc.id)}
          transporterId={wateringPlan.transporter.id}
          trailerId={wateringPlan.trailer?.id}
        />

        <WithTreesAndClusters
          onClickTree={handleTreeClick}
          onClickCluster={handleClusterClick}
        />
      </Suspense>
    </MapContainer>
  );
}

export default WateringPlanPreviewRoute 
