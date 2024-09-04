import { loginApi } from "@/api/backendApi";
import { KeycloakJWT } from "@/lib/types/keycloak";
import { decodeJWT } from "@/lib/utils";
import useStore from "@/store/store";
import {
  createFileRoute,
  redirect as routerRedirect,
} from "@tanstack/react-router";
import { z } from "zod";

const authSearchParamsSchema = z.object({
  session_state: z.string(),
  iss: z.string(),
  code: z.string(),
  redirect: z.string(),
});

export const Route = createFileRoute("/auth/callback")({
  validateSearch: authSearchParamsSchema,
  loaderDeps: ({ search: { code } }) => ({ code }),
  beforeLoad: async ({ search: { code, redirect } }) => {
    const token = await loginApi
      .v1TokenPost({
        redirectUrl: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirect)}`,
        body: {
          code,
        },
      })
      .catch((err) => {
        console.error(err);
        throw new Error(err.message);
      });

    if (!token) {
      console.error("Error while fetching token");
      throw new Error("Error while fetching token");
    }


    useStore.setState((state) => {
      state.auth.isAuthenticated = true;
      state.auth.token = token;
    });

    const jwtInfo = decodeJWT<KeycloakJWT>(token.accessToken);
    
    if (jwtInfo) {
      useStore.setState((state) => {
        state.user.email = jwtInfo.email;
        state.user.username = jwtInfo.preferred_username;
        state.user.firstName = jwtInfo.given_name;
        state.user.lastName = jwtInfo.family_name;
      });
    }

    throw routerRedirect({
      to: redirect,
      replace: true,
    });
  },
});
