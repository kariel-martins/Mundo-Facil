import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
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
import {
  Boxes,
  DollarSign,
  FileQuestionMark,
  Image,
  Package,
} from "lucide-react";
import { InputField } from "@/components/form/input";
import {
  productsSchema,
  type ProductDataForm,
} from "@/hooks/products/dtos/products.schemas";
import { createMutateProducts } from "@/hooks/products/mutation/product.mutate";
import { SelectField } from "@/components/form/select";
import { useState } from "react";

export function CreateProduct() {
  const [alert, setAlert] = useState<string | null>(null);
  const navigate = useNavigate();
  const { mutateAsync: CreateProducts } = createMutateProducts();
  const { store_id } = useParams();
  const createProduct = useForm({
    resolver: zodResolver(productsSchema),
    defaultValues: {
      productName: "",
      category: "",
      price: 0,
      description: "",
      estoque: 0,
      image: "",
    },
  });
  async function handleProducts(data: ProductDataForm) {
    try {
      await CreateProducts({ store_id: store_id ?? "", ...data });
      navigate(`/stores/${store_id}`);
      createProduct.reset();
    } catch (error: any) {
      if (error.response) {
        const data = error.response.data as { errors: { default: string } };
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
              Criar Produto
            </CardTitle>

            <CardDescription className="text-gray-500">
              Preencha os dados de forma clara para vender no Mundo Fácil.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...createProduct}>
              <form
                onSubmit={createProduct.handleSubmit(handleProducts)}
                className="space-y-4"
              >
                <InputField
                  name="productName"
                  control={createProduct.control}
                  label="Nome do produto"
                  placeholder="Digite o nome do produto..."
                  type="text"
                  icon={<Package className="w-5 h-5 text-gray-600" />}
                />
                <SelectField
                  name="category"
                  control={createProduct.control}
                  label="Categoria"
                  placeholder="Escolha uma categoria"
                  options={[
                    "Casa & Conforto",
                    "Organização & Limpeza",
                    "Tecnologia Essencial",
                    "Saúde & Bem-Estar",
                    "Ferramentas & Reparos",
                    "Moda Básica",
                    "Lazer Simples",
                    "Automotivos",
                    "Acessórios",
                    "Outros",
                  ]}
                />
                <InputField
                  name="price"
                  control={createProduct.control}
                  label="Preço"
                  type="number"
                  placeholder="Digite o valor do produto..."
                  icon={<DollarSign className="w-5 h-5 text-gray-600" />}
                />
                <InputField
                  name="description"
                  control={createProduct.control}
                  label="Descrição"
                  type="text"
                  placeholder="Descreva caracteriscas do produto..."
                  icon={<FileQuestionMark className="w-5 h-5 text-gray-600" />}
                />
                <InputField
                  name="estoque"
                  control={createProduct.control}
                  label="Estoque"
                  type="number"
                  placeholder="Estoque..."
                  icon={<Boxes className="w-5 h-5 text-gray-600" />}
                />
                <InputField
                  name="image"
                  control={createProduct.control}
                  label="Image"
                  type="text"
                  placeholder="Link de uma imagens..."
                  icon={<Image className="w-5 h-5 text-gray-600" />}
                />
                <Button
                  type="submit"
                  className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 shadow-md transition-colors"
                >
                  Criar Produto
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
