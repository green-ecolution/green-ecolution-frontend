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
  treeSensorApi,
} from './backendApi'

export const treeClusterQuery = () =>
  queryOptions<TreeClusterList>({
    queryKey: ['cluster'],
    queryFn: () => clusterApi.getAllTreeClusters(),
  })

export const treeClusterIdQuery = (id: string) =>
  queryOptions<TreeCluster>({
    queryKey: ['treescluster', id],
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

export const treeQuery = () =>
  queryOptions<TreeList>({
    queryKey: ['tree'],
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
    queryKey: ['tree', id],
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
