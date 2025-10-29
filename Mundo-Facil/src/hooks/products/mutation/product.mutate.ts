import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductService } from "../services/product.service";

const service = new ProductService()

export function useGetAllMutateProducts() {
    return useQuery({
        queryKey: ["products"],
        queryFn: service.getAll,
    })
}

export function getByIdMutateProducts(product_id: string) {
    return useQuery({
        queryKey: ["products"],
        queryFn: () => service.getById(product_id),
        refetchOnMount: true,
        enabled: !!product_id
    })
}

export function createMutateProducts() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: service.create,
        onSuccess: ()=> {
            queryClient.invalidateQueries({queryKey: ['products']})
        }
    })
}

export function updateMutateProducts() {
   const queryClient = useQueryClient()
  return useMutation({
    mutationFn: service.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })
}

export function removeMutateProducts() {
    const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (product_id: string) => service.remove(product_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })
}