import { Button } from "@/components/ui/button";
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
import { Mail } from "lucide-react";
import { InputField } from "@/components/form/input";
import { forgotPasswordMutate } from "@/hooks/auth/mutations/auth.mutations";
import {
  validateForgotPassword,
  type ForgotPasswordFormData,
} from "@/hooks/auth/dtos/schemas";
import { useNavigate, Link } from "react-router-dom";

export function ForgotPassword() {
  const navigate = useNavigate();
  const { mutateAsync: ForgotPasswordHook } = forgotPasswordMutate();
  const forgotPassword = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(validateForgotPassword),
    defaultValues: {
      email: "",
    },
  });

  async function handleResetPassword({ email }: ForgotPasswordFormData) {
    await ForgotPasswordHook(email);
    navigate("/await-page");
    forgotPassword.reset();
  }

  return (
    // Fundo limpo (branco ou cinza claro)
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      {/* Removido hero-gradient */}

      {/* Card limpo: removido blur e animação, com sombra e borda sutis */}
      <Card className="w-full max-w-md shadow-xl border border-gray-200">
        <CardHeader className="text-center space-y-2">
          {/* Branding Mundo Fácil (Azul Claro) */}
          <div className="text-3xl font-bold text-gray-800">
             MUNDO <span className="text-blue-400">FÁCIL</span>
          </div>
          <CardTitle className="text-2xl text-gray-800">Recuperar Senha</CardTitle>
          <CardDescription className="text-gray-500">
            Informe seu e-mail para receber instruções de recuperação.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...forgotPassword}>
            <form
              onSubmit={forgotPassword.handleSubmit(handleResetPassword)}
              className="space-y-4"
            >
              <InputField
                name="email"
                control={forgotPassword.control}
                label="Email"
                type="email"
                placeholder="seu email"
                icon={<Mail className="w-5 h-5 text-gray-600" />}
              />
              <Button
                type="submit"
                // Cor principal no Azul Claro/Céu
                className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 shadow-md transition-colors"
              >
                Enviar
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            {/* Link no Azul Claro/Céu */}
            <Link to="/signIn" className="text-blue-400 hover:underline">
              Voltar ao login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}