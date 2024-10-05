import useStore from "@/store/store";


export function useStoreSubscribe(subscriber: Parameters<typeof useStore.subscribe>[0]) {
  return useStore.subscribe(subscriber);
}


