import { queryOptions } from '@tanstack/react-query'
import { clusterApi, treeApi, TreeCluster } from './backendApi'

export const treeClusterQuery = (token: string) =>
  queryOptions({
    queryKey: ['cluster'],
    queryFn: async () =>
      clusterApi.getAllTreeClusters({ authorization: token }),
  })

export const treeClusterIdQuery = (id: string, token: string) =>
  queryOptions<TreeCluster>({
    queryKey: ['treescluster', id],
    queryFn: () =>
      clusterApi.getTreeClusterById({
        authorization: token,
        clusterId: id,
      }),
  })

export const treeQuery = (token: string) =>
  queryOptions({
    queryKey: ['tree'],
    queryFn: async () => treeApi.getAllTrees({ authorization: token }),
  })
