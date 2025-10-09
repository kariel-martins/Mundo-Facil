import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentService } from "../services/payment.service";

export function usePaymentIntent() {
 const queryClient = useQueryClient()
 return useMutation({
  mutationFn: paymentService,
  onSuccess: ()=> {
    queryClient.invalidateQueries({ queryKey: ["orders"]})
  }
 })
}

// Tipo	Número	Resultado
// Cartão válido	4242 4242 4242 4242	Pagamento aprovado
// Cartão com falha	4000 0000 0000 9995	Falha
// Cartão autenticado (3D Secure)	4000 0027 6000 3184	Requer autenticação