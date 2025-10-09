import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./pages/main";
import { SignIn } from "./pages/signIn";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SignUp } from "./pages/signUp";
import { Page404 } from "./pages/404";
import { PageAwait } from "./pages/pageAwait";
import { Orders } from "./pages/orders";
import { Cart } from "./pages/carts";
import { ForgotPassword } from "./pages/forgotPassword";
import { ResetPassword } from "./pages/resetPassword";
import { CreateProduct } from "./pages/createProducts";
import { CreateStores } from "./pages/createStores";
import React from "react";
import { VerifyEmail } from "./pages/verifyEmail";
import { AuthProvider } from "./contexts/AuthContext";
import { Store } from "./pages/stores";
import { StoreProducts } from "./pages/stores-products";
import { SearchPage } from "./pages/searchPage";
import { PageProduct } from "./pages/pageProduct";
import { PrivateRoute } from "./hooks/use-private-routes";
import { CatalogPage } from "./pages/catalog";
import { ManageProduct } from "./pages/manageProduct";
import { CheckoutPage } from "./pages/checkoutPage";
import { PaymentCancelledPage } from "./pages/CancellationPage";
import { SuccessPage } from "./pages/SuccessPage";

const queryClient = new QueryClient();

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/await-page" element={<PageAwait />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/not-found" element={<Page404 />} />


              <Route path="/" element={<Main />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/products/:product_id" element={<PageProduct />} />

              <Route path="/checkout/success" element={<SuccessPage />} />
              <Route path="/checkout/cancel" element={<PaymentCancelledPage />} />
              
              <Route element={<PrivateRoute />}>
                <Route path="/products" element={<PageProduct />} />

                <Route path="/carts" element={<Cart />} />
                <Route path="/orders" element={<Orders />} />

                <Route
                  path="/stores/:store_id/products/cadastro"
                  element={<CreateProduct />}
                />
                <Route
                  path="/stores/:store_id/products/manage/:product_id"
                  element={<ManageProduct />}
                />

                <Route path="/checkout" element={<CheckoutPage />} />
                
                <Route path="/stores/cadastro" element={<CreateStores />} />
                <Route path="/stores" element={<Store />} />
                <Route path="/stores/:store_id" element={<StoreProducts />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;