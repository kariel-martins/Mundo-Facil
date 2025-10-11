import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { OrderServices } from "../services/orders.service";

const service = new OrderServices();

export function getAllMutateOrders(user_id: string) {
  return useQuery({
    queryKey: ["orders", user_id],
    queryFn: () => service.getAll(user_id),
    refetchOnMount: true,
    enabled: !!user_id,
  });
}
export function getAllItemsMutateOrders(order_id: string) {
  return useQuery({
    queryKey: ["order_items", order_id],
    queryFn: () => service.getAllItems(order_id),
    refetchOnMount: true,
    enabled: !!order_id,
  });
}

export function updateMutateOrders() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: service.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function removeMutateOrders() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: service.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
