import useAuthStore from "@/store/auth/authStore";
import { infoApi } from "@/api/backendApi";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/info")({
  component: Info,
});

function Info() {
  const {apiHeader: authorization} = useAuthStore(state => ({apiHeader: state.apiHeader}))

  const { data, isFetching } = useQuery({
    queryKey: ["info"],
    queryFn: () => infoApi.getAppInfo({
      authorization
    }),
  });

  const { isAuthenticated, token } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    token: state.token,
  }));

  return (
    <div>
      <h1>App Info</h1>
      <p>Authenticated: {isAuthenticated ? "Yes" : "No"}</p>
      <p>Token: {token ? "Yes" : "No"}</p>
      <pre>{JSON.stringify(token, null, 2)}</pre>
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}
