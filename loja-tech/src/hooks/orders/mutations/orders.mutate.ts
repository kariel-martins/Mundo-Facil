import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { OrderServices } from "../services/orders.service";

const service = new OrderServices();
export function createMutateOrders() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: service.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function getByIdMutateOrders(order_id: string) {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => service.getById(order_id),
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
