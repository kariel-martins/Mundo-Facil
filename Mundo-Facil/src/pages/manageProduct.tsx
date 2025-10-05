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
import {
  getByIdMutateProducts,
  updateMutateProducts,
} from "@/hooks/products/mutation/product.mutate";
import { SelectField } from "@/components/form/select";
import { useEffect } from "react";

export function ManageProduct() {
  const navigate = useNavigate();
  const { mutateAsync: UpdateProducts } = updateMutateProducts();
  const { store_id, product_id } = useParams();
  const { data } = getByIdMutateProducts(product_id ?? "");
  const updateProduct = useForm({
    resolver: zodResolver(productsSchema),
    defaultValues: {
      productName: data?.productName,
      category: data?.category,
      price: data?.price,
      description: data?.description,
      estoque: data?.estoque,
      image: data?.image,
    },
  });

  useEffect(() => {
    if (data) {
      updateProduct.reset({
        productName: data.productName ?? "",
        category: data.category ?? "",
        price: data.price ?? 0,
        description: data.description ?? "",
        estoque: data.estoque ?? 0,
        image: data.image ?? "",
      });
    }
  }, [data, updateProduct]);

  async function handleProducts(data: ProductDataForm) {
    console.log(data);
    try {
      await UpdateProducts({ product_id: store_id ?? "", ...data });
      navigate(`/stores/${store_id}`);
      updateProduct.reset();
    } catch (error: any) {
      if (error.response) {
        const data = error.response.data;

        if (data.field && data.message) {
          updateProduct.setError(data.field as keyof ProductDataForm, {
            type: "server",
            message: data.message,
          });
        } else if (Array.isArray(data.errors)) {
          data.errors.forEach((err: { field: string; message: string }) => {
            updateProduct.setError(err.field as keyof ProductDataForm, {
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
      <Card className="w-full max-w-md shadow-xl border border-gray-200">
        <CardHeader className="text-center space-y-2">
          <div className="text-3xl font-bold text-gray-800">
            MUNDO <span className="text-blue-400">FÁCIL</span>
          </div>
          <CardTitle className="text-2xl text-gray-800">Produto</CardTitle>

          <CardDescription className="text-gray-500">
            Preencha os dados de forma clara para vender no Mundo Fácil.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...updateProduct}>
            <form
              onSubmit={updateProduct.handleSubmit(handleProducts)}
              className="space-y-4"
            >
              <InputField
                name="productName"
                control={updateProduct.control}
                label="Nome do produto"
                placeholder="Digite o nome do produto..."
                type="text"
                icon={<Package className="w-5 h-5 text-gray-600" />}
              />
              <SelectField
                name="category"
                control={updateProduct.control}
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
                control={updateProduct.control}
                label="Preço"
                type="number"
                placeholder="Digite o valor do produto..."
                icon={<DollarSign className="w-5 h-5 text-gray-600" />}
              />
              <InputField
                name="description"
                control={updateProduct.control}
                label="Descrição"
                type="text"
                placeholder="Descreva caracteriscas do produto..."
                icon={<FileQuestionMark className="w-5 h-5 text-gray-600" />}
              />
              <InputField
                name="estoque"
                control={updateProduct.control}
                label="Estoque"
                type="number"
                placeholder="Estoque..."
                icon={<Boxes className="w-5 h-5 text-gray-600" />}
              />
              <InputField
                name="image"
                control={updateProduct.control}
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
  );
}
