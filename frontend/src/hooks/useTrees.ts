import { useQuery } from "@tanstack/react-query";
import { useAuthHeader } from "./useAuthHeader";
import { treeApi } from "@/api/backendApi";

export function useTrees() {
  const authorization = useAuthHeader();
  const { data: treeRes } = useQuery({
    queryKey: ["trees"],
    queryFn: () => treeApi.getAllTrees({ authorization }),
  });

  return treeRes?.data || [];
}
