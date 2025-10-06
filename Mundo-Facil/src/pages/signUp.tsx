import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
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
import { Lock, Mail, User } from "lucide-react";
import { InputField } from "@/components/form/input";
import { sigUpMutate } from "@/hooks/auth/mutations/auth.mutations";
import { validateSignUp, type SignUpFormData } from "@/hooks/auth/dtos/schemas";
import { useEffect, useState } from "react";

export function SignUp() {
  const [alert, setAlert] = useState<string | null>();
  const navigate = useNavigate();
  const { mutateAsync: SignUpHook } = sigUpMutate();
  const signUp = useForm<SignUpFormData>({
    resolver: zodResolver(validateSignUp),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(()=> {
      if (alert) {
       const timer = setTimeout(() => setAlert(null), 5000);
        return () => clearTimeout(timer);
      }
    }, [alert])

  async function handleSignUp(data: SignUpFormData) {
    try {
      await SignUpHook(data);
      navigate("/await-page");
      signUp.reset();
    } catch (error: any) {
      const data = error.response.data as { errors: { default: string } };
      if (data.errors) {
        setAlert(data.errors.default);
      }
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
              Criar Uma Conta
            </CardTitle>
            <CardDescription className="text-gray-500">
              Rápido, fácil e feito para simplificar suas compras.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...signUp}>
              <form
                onSubmit={signUp.handleSubmit(handleSignUp)}
                className="space-y-4"
              >
                <InputField
                  name="name"
                  control={signUp.control}
                  label="Nome Completo"
                  placeholder="Seu nome"
                  type="text"
                  icon={<User className="w-5 h-5 text-gray-600" />}
                />
                <InputField
                  name="email"
                  control={signUp.control}
                  label="Email"
                  placeholder="seu email"
                  type="text"
                  icon={<Mail className="w-5 h-5 text-gray-600" />}
                />
                <InputField
                  name="password"
                  control={signUp.control}
                  label="Senha de Acesso"
                  type="password"
                  placeholder="código secreto"
                  icon={<Lock className="w-5 h-5 text-gray-600" />}
                />
                <InputField
                  name="confirmPassword"
                  control={signUp.control}
                  label="Confirmar Senha"
                  type="password"
                  placeholder="repita o código secreto"
                  icon={<Lock className="w-5 h-5 text-gray-600" />}
                />

                <Button
                  type="submit"
                  className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 shadow-md transition-colors"
                >
                  Criar Conta
                </Button>
              </form>
            </Form>

            <div className="mt-8 space-y-3 text-center text-sm text-gray-500">
              <Link
                to="/signIn"
                className="text-blue-400 hover:text-blue-500 hover:underline block transition-colors font-medium"
              >
                Já possui uma conta?{" "}
                <span className="font-semibold">Fazer Login</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
