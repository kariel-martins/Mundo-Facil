import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { LockIcon } from "lucide-react";
import { InputField } from "@/components/form/input";
import { useEffect, useState } from "react";
import { IconLoader } from "@/components/ShoppingBag";
import { useAuth } from "@/contexts/AuthContext";
import z from "zod"
import { DeleteAccountMuntate } from "@/hooks/users/mutations/user.mutate";

const DeleteAccountForm = z.object({
specialCode: z.string()
})

type DeleteAccountFormSchema = z.infer<typeof DeleteAccountForm>

export function DeleteAccount() {
  const { mutateAsync: deleteAccountAsync, isPending } = DeleteAccountMuntate();
  const [alert, setAlert] = useState<string | null>(null);
  const [ specialCode, setSpecialCode ] = useState("")
const { user, logout } = useAuth()

  const [longDelay, setLongDelay] = useState(false);
  const deleteAcount = useForm<DeleteAccountFormSchema>({
    resolver: zodResolver(DeleteAccountForm),
    defaultValues: {
        specialCode: ""
    },
  });

  useEffect(() => {
    if (user?.name) {
      setSpecialCode(`${user.name}-excluir`);
    }
  }, [user]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  useEffect(() => {
    if (!isPending) {
      setLongDelay(false);
    }
  }, [isPending]);

  async function handleDelete(data:DeleteAccountFormSchema) {

    const LONG_DELAY_THRESHOLD = 10000; // 10s
    const delayTimer = setTimeout(
      () => setLongDelay(true),
      LONG_DELAY_THRESHOLD
    );

    if (specialCode !== data.specialCode) return setAlert("Código especial inválido.")

    try {
      await deleteAccountAsync(user?.user_id ?? "");
      deleteAcount.reset();
      logout()
    } catch (error: any) {
      if (error?.response?.data?.errors?.default) {
        setAlert(error.response.data.errors.default);
      } else if (error?.message) {
        setAlert(error.message);
      } else {
        setAlert("Erro ao deleta conta. Tente novamente.");
      }
    } finally {
      clearTimeout(delayTimer);
      setLongDelay(false);
    }
  }

  return (
    <div>
      {alert && (
        <div className="absolute w-screen mb-4 p-3 text-sm text-yellow-800 bg-yellow-100 border border-yellow-300 rounded-md text-center animate-fade-in">
          {alert}
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <Card className="w-full max-w-md shadow-xl border border-gray-200">
          <CardHeader className="text-center space-y-2">
            <div className="text-3xl font-bold text-gray-800">
              MUNDO <span className="text-blue-400">FÁCIL</span>
            </div>
            <CardTitle className="text-2xl text-gray-800">
             Deletar Sua Conta?
            </CardTitle>
            <CardDescription className="text-gray-500">
              Insira o código especila <span className="font-bold">{specialCode}</span> para excluir sua conta
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...deleteAcount}>
              <form
                onSubmit={deleteAcount.handleSubmit(handleDelete)}
                className="space-y-4"
              >
                <InputField
                  name="specialCode"
                  control={deleteAcount.control}
                  label="Código especial"
                  placeholder="Código..."
                  type="text"
                  icon={<LockIcon className="w-5 h-5 text-gray-600" />}
                />

                <div className="flex items-center gap-2">
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 w-full bg-red-400 hover:bg-red-500 text-white font-semibold py-3 shadow-md transition-colors disabled:opacity-60"
                  >
                    {isPending ? "Excluindo..." : "Excluir"}
                  </Button>
                </div>

                {isPending && (
                  <div className="flex items-center gap-2 mt-2">
                    <IconLoader size={20} />
                    <span className="text-sm text-gray-600">
                      Processando login...
                    </span>
                  </div>
                )}

                {longDelay && (
                  <div className="mt-2 text-sm text-gray-700 bg-yellow-50 p-2 rounded">
                    Está demorando mais do que o normal. Verifique sua conexão
                    ou tente novamente.
                  </div>
                )}
              </form>
            </Form>

            <div className="mt-8 space-y-3 text-center text-sm">
              <Link
                to="/forgot-password"
                className="text-gray-500 hover:text-blue-500 hover:underline transition-colors block"
              >
                Esqueci minha senha
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
