import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { StoreService } from "../services/stores.service";

const service = new StoreService()

export function getAllMutateStore(user_id: string) {
    return useQuery({
        queryKey: ["stores"],
        queryFn: () => service.getAll(user_id),
        refetchOnMount: true,
        enabled: !!user_id
    })
}

export function createMutateStore() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: service.create,
        onSuccess: ()=> {
            queryClient.invalidateQueries({queryKey: ['stores']})
        }
    })
}

export function updateMutateStore() {
   const queryClient = useQueryClient()
  return useMutation({
    mutationFn: service.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] })
    },
  })
}

export function removeMutateStore() {
    const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (store_id: string) => service.remove(store_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] })
    },
  })
}