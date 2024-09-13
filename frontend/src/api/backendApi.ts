import {
  Configuration,
  ConfigurationParameters,
  HTTPHeaders,
  InfoApi,
  UserApi,
} from "@green-ecolution/backend-client";

const headers: HTTPHeaders = {
  "Content-Type": "application/json",
  "Accept": "application/json",
};

const configParams: ConfigurationParameters = {
  basePath: import.meta.env.VITE_BACKEND_BASEURL ?? "/api-local",
  headers
};

const config = new Configuration(configParams);

// export const treeApi = new TreesApi(config);
export const infoApi = new InfoApi(config);
export const userApi = new UserApi(config);

export * from "@green-ecolution/backend-client";
