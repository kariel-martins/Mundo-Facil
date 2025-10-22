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
import { IconLoader } from "@/components/ShoppingBag";
import { useAuth } from "@/contexts/AuthContext";

export function SignIn() {
  const location = useLocation();
  const navigate = useNavigate();
  const { mutateAsync: signInAsync, isPending } = signInMutate();
  const [alert, setAlert] = useState<string | null>(null);
  const { login } = useAuth();

  const [longDelay, setLongDelay] = useState(false);

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

  async function handleSignIn(data: SignInFormData) {
    setAlert(null);

    const LONG_DELAY_THRESHOLD = 10000; // 10s
    const delayTimer = setTimeout(
      () => setLongDelay(true),
      LONG_DELAY_THRESHOLD
    );

    try {
      const result = await signInAsync(data);
      login({
        user_id: result.user_id,
        email: result.email,
        name: result.name,
      });
      if (!isPending || !localStorage.getItem("user")) return navigate("/");
      signIn.reset();
    } catch (error: any) {
      if (error?.response?.data?.errors?.default) {
        setAlert(error.response.data.errors.default);
      } else if (error?.message) {
        setAlert(error.message);
      } else {
        setAlert("Erro ao efetuar login. Tente novamente.");
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

                <div className="flex items-center gap-2">
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 shadow-md transition-colors disabled:opacity-60"
                  >
                    {isPending ? "Entrando..." : "Entrar"}
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
                to="/signUp"
                className="text-blue-400 hover:text-blue-500 hover:underline transition-colors block font-medium"
              >
                <span className="font-semibold">
                  Criar Conta no Mundo Fácil
                </span>
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
