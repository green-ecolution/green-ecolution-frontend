import {
  Configuration,
  ConfigurationParameters,
  FileImportApi,
  HTTPHeaders,
  InfoApi,
  RegionApi,
  SensorApi,
  TreeApi,
  TreeClusterApi,
  UserApi,
} from '@green-ecolution/backend-client'

const headers: HTTPHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

const configParams: ConfigurationParameters = {
  basePath: import.meta.env.VITE_BACKEND_BASEURL ?? '/api-local',
  headers,
}

const config = new Configuration(configParams)

export const treeApi = new TreeApi(config)
export const clusterApi = new TreeClusterApi(config)
export const infoApi = new InfoApi(config)
export const userApi = new UserApi(config)
export const regionApi = new RegionApi(config)
export const sensorApi = new SensorApi(config)
export const importApi = new FileImportApi(
  new Configuration({
    basePath: import.meta.env.VITE_BACKEND_BASEURL ?? '/api-local',
  })
)

export * from '@green-ecolution/backend-client'
