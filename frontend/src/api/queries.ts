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
  UserList,
  userApi,
  GeoJson,
  SensorDataList,
} from './backendApi'

export const treeClusterQuery = (params?: { page?: string; limit?: string }) =>
  queryOptions<TreeClusterList>({
    queryKey: ['treeclusters', params?.page ?? '1', params?.limit ?? 'none'],
    queryFn: () => clusterApi.getAllTreeClusters(params),
  })

export const treeClusterIdQuery = (id: string) =>
  queryOptions<TreeCluster>({
    queryKey: ['treecluster', id],
    queryFn: () =>
      clusterApi.getTreeClusterById({
        clusterId: id,
      }),
  })

export const sensorQuery = (params?: { page?: string; limit?: string }) =>
  queryOptions<SensorList>({
    queryKey: ['sensors', params?.page ?? '1', params?.limit ?? 'none'],
    queryFn: () => sensorApi.getAllSensors(params),
  })

export const sensorDataQuery = (id: string) =>
  queryOptions<SensorDataList>({
    queryKey: ['sensor data', id],
    queryFn: () =>
      sensorApi.getAllSensorDataById({
        sensorId: id
      }),
  })

export const sensorIdQuery = (id: string) =>
  queryOptions<Sensor>({
    queryKey: ['sensor', id],
    queryFn: () =>
      sensorApi.getSensorById({
        sensorId: id,
      }),
  })

export const treeQuery = (params?: { page?: string, limit?: string }) =>
  queryOptions<TreeList>({
    queryKey: ['trees', params?.page ?? '1', params?.limit ?? 'none'],
    queryFn: () => treeApi.getAllTrees(params),
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

export const vehicleQuery = (params?: {
  type?: string
  page?: string
  limit?: string
}) => {
  return queryOptions<VehicleList>({
    queryKey: [
      'vehicle',
      params?.type ?? '1',
      params?.page ?? '1',
      params?.limit ?? 'none',
    ],
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

export const wateringPlanQuery = (params?: { page?: string; limit?: string }) =>
  queryOptions<WateringPlanList>({
    queryKey: ['watering-plans', params?.page ?? '1', params?.limit ?? 'none'],
    queryFn: () => wateringPlanApi.getAllWateringPlans(params),
  })

export const wateringPlanIdQuery = (id: string) =>
  queryOptions<WateringPlan>({
    queryKey: ['watering-plan', id],
    queryFn: () =>
      wateringPlanApi.getWateringPlanById({
        id: id,
      }),
  })

export const userQuery = (params?: { userIds: string }) => {
  return queryOptions<UserList>({
    queryKey: ['users', params?.userIds ?? 'all'],
    queryFn: () => userApi.getAllUsers(params),
  })
}

export const userRoleQuery = (role: string) =>
  queryOptions<UserList>({
    queryKey: ['user', role],
    queryFn: () =>
      userApi.getUsersByRole({
        role: role,
      }),
  })

export const routePreviewQuery = (
  transporterId: number,
  clusterIds: number[],
  trailerId?: number
) =>
  queryOptions<GeoJson>({
    queryKey: [
      'route',
      'preview',
      `transporter:${transporterId}`,
      ...clusterIds,
    ],
    queryFn: () =>
      wateringPlanApi.v1WateringPlanRoutePreviewPost({
        body: {
          transporterId: Number(transporterId), // TODO: don't know what goes wrong here
          trailerId: Number(trailerId),
          clusterIds,
        },
      }),
  })
