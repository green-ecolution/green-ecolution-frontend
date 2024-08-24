import { loginApi } from "@/api/backendApi";
import useAuthStore from "@/store/auth/authStore";
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

export const Route = createFileRoute("/auth/callback/keycloak")({
  validateSearch: authSearchParamsSchema,
  loaderDeps: ({ search: { code } }) => ({ code }),
  beforeLoad: async ({ search: { code, redirect } }) => {
    const token = await loginApi
      .v1TokenPost({
        redirectUrl: `${window.location.origin}/auth/callback/keycloak?redirect=${redirect}`,
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

    console.log("token", token);

    useAuthStore.setState((state) => ({
      ...state,
      isAuthenticated: true,
      token: token,
      apiHeader: `${token.tokenType} ${token.accessToken}`,
    }));

    throw routerRedirect({
      to: redirect,
      replace: true,
    });
  },
});
