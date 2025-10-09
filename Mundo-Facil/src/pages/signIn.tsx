import { Button } from "@/components/ui/button";
import { useNavigate, Link, useLocation } from "react-router-dom";
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
import { Lock, User } from "lucide-react";
import {
  type SignInFormData,
  validateSignIn,
} from "../hooks/auth/dtos/schemas";
import { InputField } from "@/components/form/input";
import { signInMutate } from "@/hooks/auth/mutations/auth.mutations";
import { useEffect, useState } from "react";

export function SignIn() {
  const location = useLocation();
  const navigate = useNavigate();
  const { mutateAsync: SignInHook } = signInMutate();
  const [alert, setAlert] = useState<string | null>(null);

  const signIn = useForm<SignInFormData>({
    resolver: zodResolver(validateSignIn),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (location.state?.message) {
      setAlert(location.state.message);
    }
  }, [location.state]);

  useEffect(()=> {
    if (alert) {
     const timer = setTimeout(() => setAlert(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [alert])

  async function handleSignIn(data: SignInFormData) {
    try {
      const result = await SignInHook(data);
      localStorage.setItem(
        "user",
        JSON.stringify({
          user_id: result.user_id,
          email: result.email,
          name: result.name,
        })
      );
      navigate(`/`);
      signIn.reset();
    } catch (error: any) {
      if (error.response) {
        const data = error.response.data as {errors: {default: string}}
        if (data.errors) {
          setAlert(data.errors.default);
        } 
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
              Acessar Sua Conta
            </CardTitle>
            <CardDescription className="text-gray-500">
              Entre para comprar de forma simples e segura.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...signIn}>
              <form
                onSubmit={signIn.handleSubmit(handleSignIn)}
                className="space-y-4"
              >
                <InputField
                  name="email"
                  control={signIn.control}
                  label="Email de Acesso"
                  placeholder="nome@exemplo.com"
                  type="text"
                  icon={<User className="w-5 h-5 text-gray-600" />}
                />
                <InputField
                  name="password"
                  control={signIn.control}
                  label="Senha de Acesso"
                  type="password"
                  placeholder="código secreto"
                  icon={<Lock className="w-5 h-5 text-gray-600" />}
                />
                <Button
                  type="submit"
                  className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 shadow-md transition-colors"
                >
                  Entrar
                </Button>
              </form>
            </Form>

            <div className="mt-8 space-y-3 text-center text-sm">
              <Link
                to="/signUp"
                className="text-blue-400 hover:text-blue-500 hover:underline transition-colors block font-medium"
              >
                <span className="font-semibold">Criar Conta no Mundo Fácil</span>
              </Link>
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
