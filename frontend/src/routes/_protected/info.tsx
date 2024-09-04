import { infoApi } from "@/api/backendApi";
import { useAuthHeader } from "@/hooks/useAuthHeader";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/info")({
  component: Info,
});

function Info() {
  const authorization = useAuthHeader();

  const { data, isFetching } = useQuery({
    queryKey: ["info"],
    queryFn: () => infoApi.getAppInfo({ authorization }),
  });

  return (
    <div>
      <h1>App Info</h1>
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}
