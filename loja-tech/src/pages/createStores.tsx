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
import { Image, Mail, ShoppingBag } from "lucide-react";
import { InputField } from "@/components/form/input";
import { StoreSchema, type StoreDataForm } from "@/hooks/stores/dtos/store.schemas";
import { createMutateStore } from "@/hooks/stores/mutation/stores.mutate";
import { useAuth } from "@/contexts/AuthContext";

export function CreateStores() {
  const { user } = useAuth()
  const navigate = useNavigate();
  const { mutateAsync: CreateStore } = createMutateStore();
  const createStore = useForm({
    resolver: zodResolver(StoreSchema),
    defaultValues: {
        storeName: "",
        email: "",
        image: ""
    },
  });

  async function handleStore(data: StoreDataForm) {
    if (!user?.user_id) return
    try {
      const result = await CreateStore({ user_id: user?.user_id, ...data });
      navigate(`/stores/${result.id}`);
      createStore.reset();
    } catch (error: any) {
      if (error.response) {
        const data = error.response.data;

        if (data.field && data.message) {
          createStore.setError(data.field as keyof StoreDataForm, {
            type: "server",
            message: data.message,
          });
        } else if (Array.isArray(data.errors)) {
          data.errors.forEach((err: { field: string; message: string }) => {
            createStore.setError(err.field as keyof StoreDataForm, {
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
          <CardTitle className="text-2xl text-gray-800">Abrir Sua Loja</CardTitle>
          {/* Descrição focada em facilidade */}
          <CardDescription className="text-gray-500">
            Comece a vender de forma simples e rápida no Mundo Fácil.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...createStore}>
            <form
              onSubmit={createStore.handleSubmit(handleStore)}
              className="space-y-4"
            >
              <InputField
                name="storeName"
                control={createStore.control}
                label="Nome da loja"
                placeholder="Digite o nome da loja..."
                type="text"
                icon={<ShoppingBag className="w-5 h-5 text-gray-600" />}
              />
              <InputField
                name="email"
                control={createStore.control}
                label="Email"
                type="text"
                placeholder="Email da loja..."
                icon={<Mail className="w-5 h-5 text-gray-600" />}
              />
              <InputField
                name="image"
                control={createStore.control}
                label="Imagem"
                type="text"
                placeholder="Link do logo da loja..."
                icon={<Image className="w-5 h-5 text-gray-600" />}
              />
              <Button
                type="submit"
                // Cor principal no Azul Claro/Céu
                className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 shadow-md transition-colors"
              >
                Criar Loja
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}