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
} from './backendApi'
import useStore from '@/store/store'

const authHeader = {
  authorization: `Bearer ${useStore.getState().auth.token?.accessToken}`,
}

export const treeClusterQuery = () =>
  queryOptions<TreeClusterList>({
    queryKey: ['cluster'],
    queryFn: () =>
      clusterApi.getAllTreeClusters({
        authorization: authHeader.authorization,
      }),
  })

export const treeClusterIdQuery = (id: string) =>
  queryOptions<TreeCluster>({
    queryKey: ['treescluster', id],
    queryFn: () =>
      clusterApi.getTreeClusterById({
        authorization: authHeader.authorization,
        clusterId: id,
      }),
  })

export const sensorQuery = () =>
  queryOptions<SensorList>({
    queryKey: ['sensors'],
    queryFn: () =>
      sensorApi.getAllSensors({ authorization: authHeader.authorization }),
  })

export const treeQuery = () =>
  queryOptions<TreeList>({
    queryKey: ['tree'],
    queryFn: () =>
      treeApi.getAllTrees({ authorization: authHeader.authorization }),
  })

export const treeIdQuery = (id: string) =>
  queryOptions<Tree>({
    queryKey: ['tree', id],
    queryFn: () =>
      treeApi.getTrees({ treeId: id, authorization: authHeader.authorization }),
  })
export const regionsQuery = () =>
  queryOptions({
    queryKey: ['regions'],
    queryFn: () =>
      regionApi.v1RegionGet({ authorization: authHeader.authorization }),
  })

export const infoQuery = () =>
  queryOptions<AppInfo>({
    queryKey: ['info'],
    queryFn: () =>
      infoApi.getAppInfo({ authorization: authHeader.authorization }),
  })
