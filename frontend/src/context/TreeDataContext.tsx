import { treeApi } from "@/api/backendApi";
import useAuthStore from "@/store/auth/authStore";
import { Tree } from "@green-ecolution/backend-client";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect } from "react";
import { toast } from "sonner";

export interface TreeDataContext {
  trees: Tree[];
}

const TreeDataContext = createContext<TreeDataContext | null>(null);

export interface TreeDataContextProviderProps extends React.PropsWithChildren {}

export const TreeDataContextProvider = ({
  children,
}: TreeDataContextProviderProps) => {
  const {apiHeader} = useAuthStore(state => ({apiHeader: state.apiHeader}));
  const { data, isError, error } = useQuery({
    queryKey: ["trees"],
    queryFn: () =>
      treeApi.getAllTrees({
        sensorData: true,
        authorization: apiHeader,
      }),
  });

  useEffect(() => {
    if (data === undefined && isError) {
      console.error("Error while fetching trees", error);
      toast.error("Es ist ein Fehler beim Aufruf der API aufgetreten", {
        description: error.message,
      });
    }
  }, [isError, error]);

  return (
    <TreeDataContext.Provider value={{ trees: data?.map(d => d.tree) ?? [] }}>
      {children}
    </TreeDataContext.Provider>
  );
};

export const useTreeDataContext = () => {
  const context = useContext(TreeDataContext);
  if (context === null) {
    throw new Error(
      "useTreeDataContext must be used within a TreeDataContextProvider",
    );
  }
  return context;
};

export const useTrees = () => {
  const { trees } = useTreeDataContext();
  return trees;
};

export const useTree = (treeId: string) => {
  const trees = useTrees();
  return trees.find((t) => t.id === treeId);
}

export default TreeDataContext;
