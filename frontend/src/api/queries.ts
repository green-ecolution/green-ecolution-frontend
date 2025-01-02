import { queryOptions } from '@tanstack/react-query'
import {
  AppInfo,
  clusterApi,
  infoApi,
  regionApi,
  sensorApi,
  SensorList,
  Tree,
  treeApi,
  TreeCluster,
  TreeClusterList,
  TreeList,
  vehicleApi,
  VehicleList,
  Vehicle,
  treeSensorApi,
  Sensor,
  WateringPlanList,
  wateringPlanApi,
  WateringPlan,
} from './backendApi'

export const treeClusterQuery = () =>
  queryOptions<TreeClusterList>({
    queryKey: ['treeclusters'],
    queryFn: () => clusterApi.getAllTreeClusters(),
  })

export const treeClusterIdQuery = (id: string) =>
  queryOptions<TreeCluster>({
    queryKey: ['treecluster', id],
    queryFn: () =>
      clusterApi.getTreeClusterById({
        clusterId: id,
      }),
  })

export const sensorQuery = () =>
  queryOptions<SensorList>({
    queryKey: ['sensors'],
    queryFn: () => sensorApi.getAllSensors(),
  })

export const sensorIdQuery = (id: string) =>
  queryOptions<Sensor>({
    queryKey: ['sensor', id],
    queryFn: () =>
      sensorApi.getSensorById({
        sensorId: id,
      }),
  })

export const treeQuery = () =>
  queryOptions<TreeList>({
    queryKey: ['trees'],
    queryFn: () => treeApi.getAllTrees(),
  })

export const treeIdQuery = (id: string) =>
  queryOptions<Tree>({
    queryKey: ['tree', id],
    queryFn: () =>
      treeApi.getTrees({
        treeId: id,
      }),
  })

export const treeSensorIdQuery = (id: string) =>
  queryOptions<Tree>({
    queryKey: ['tree-sensor', id],
    queryFn: () =>
      treeSensorApi.getTreeBySensorId({
        sensorId: id,
      }),
  })

export const regionsQuery = () =>
  queryOptions({
    queryKey: ['regions'],
    queryFn: () => regionApi.v1RegionGet(),
  })

export const infoQuery = () =>
  queryOptions<AppInfo>({
    queryKey: ['info'],
    queryFn: () => infoApi.getAppInfo(),
  })

export const vehicleQuery = (params?: { type: string }) => {
  const queryKey = ['vehicle', params?.type ?? 'all']

  return queryOptions<VehicleList>({
    queryKey,
    queryFn: () => vehicleApi.getAllVehicles(params),
  })
}

export const vehicleIdQuery = (id: string) =>
  queryOptions<Vehicle>({
    queryKey: ['vehicle', id],
    queryFn: () =>
      vehicleApi.getVehicleById({
        id: id,
      }),
  })

export const wateringPlanQuery = () =>
  queryOptions<WateringPlanList>({
    queryKey: ['watering-plans'],
    queryFn: () => wateringPlanApi.getAllWateringPlans(),
  })

export const wateringPlanIdQuery = (id: string) =>
  queryOptions<WateringPlan>({
    queryKey: ['watering-plan', id],
    queryFn: ()=>
      wateringPlanApi.getWateringPlanById({
        id: id,
      }),
  })
