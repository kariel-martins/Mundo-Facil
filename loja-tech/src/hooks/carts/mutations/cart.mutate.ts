import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CartService } from "../services/cart.service";

const service = new CartService();

export function createMutateCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: service.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
  });
}

export function getMutateCart(user_id: string) {
  return useQuery({
    queryKey: ["carts"],
    queryFn: () => service.getCart(user_id),
    refetchOnMount: true,
    enabled: !!user_id,
  });
}

export function updatemutateCart() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: service.update,
        onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
    })
}
export function removeMutateCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: service.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
  });
}
