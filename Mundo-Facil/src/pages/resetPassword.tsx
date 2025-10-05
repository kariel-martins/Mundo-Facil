import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
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
import { Lock} from "lucide-react";
import { InputField } from "@/components/form/input";
import { resetPasswordMutate } from "@/hooks/auth/mutations/auth.mutations";
import { validateResetPassword, type ResetPasswordFormData } from "@/hooks/auth/dtos/schemas";

export function ResetPassword() {
  const navigate = useNavigate();
  const { mutateAsync: resetPasswordHook } = resetPasswordMutate();
  const resetPassword = useForm<ResetPasswordFormData>({
    resolver: zodResolver(validateResetPassword),
    defaultValues: {
      password: "",
      confirmPassword: ""
    },
  });
  async function handleResetPassword(data: ResetPasswordFormData) {
    try {
      await resetPasswordHook(data);
      navigate("/await-page");
      resetPassword.reset();
    } catch (error:any) {
      if (error.response) {
        const data = error.response.data;

        if (data.field && data.message) {
          resetPassword.setError(data.field as keyof ResetPasswordFormData, {
            type: "server",
            message: data.message,
          });
        } else if (Array.isArray(data.errors)) {
          data.errors.forEach((err: { field: string; message: string }) => {
            resetPassword.setError(err.field as keyof ResetPasswordFormData, {
              type: "server",
              message: err.message,
            });
          });
        } else if (data.message) {
          console.error("Erro:", data.message);
        }
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">

      {/* Card limpo: removido blur e animação, com sombra e borda sutis */}
      <Card className="w-full max-w-md shadow-xl border border-gray-200">
        <CardHeader className="text-center space-y-2">
          {/* Branding Mundo Fácil (Azul Claro) */}
          <div className="text-3xl font-bold text-gray-800 mb-4">
             MUNDO <span className="text-blue-400">FÁCIL</span>
          </div>
          <CardTitle className="text-2xl text-gray-800">
            Redefinir Senha
          </CardTitle>
          <CardDescription className="text-gray-500">
            Crie uma nova senha segura para sua conta.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...resetPassword}>
            <form
              onSubmit={resetPassword.handleSubmit(handleResetPassword)}
              className="space-y-4"
            >
              <InputField
                name="password"
                control={resetPassword.control}
                label="Nova Senha"
                type="password"
                placeholder="sua nova senha"
                icon={<Lock className="w-5 h-5 text-gray-600" />}
              />
              <InputField
                name="confirmPassword"
                control={resetPassword.control}
                label="Confirme a Senha"
                type="password"
                placeholder="Repita sua nova senha"
                icon={<Lock className="w-5 h-5 text-gray-600" />}
              />
              <Button
                type="submit"
                className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 shadow-md transition-colors"
              >
                Confirmar Nova Senha
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}