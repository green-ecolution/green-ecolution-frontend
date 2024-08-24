/// <reference types: string

interface ImportMetaEnv {
  readonly BASE_URL: string;

  readonly VITE_BACKEND_BASEURL: string;

  readonly VITE_OCID_KEYCLOAK_AUTH_URL: string;
  readonly VITE_OCID_KEYCLOAK_TOKEN_URL: string;
  readonly VITE_OCID_KEYCLOAK_CLIENT_ID: string;
  readonly VITE_OCID_KEYCLOAK_CLIENT_SECRET: string;
  readonly VITE_OCID_KEYCLOAK_REDIRECT_URI: string;
  readonly VITE_OCID_KEYCLOAK_POST_LOGOUT_REDIRECT_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
