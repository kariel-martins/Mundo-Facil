import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";
import { IconLoader } from "@/components/ShoppingBag";


type AuthResponse = {
  ok: boolean;
};

export const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<AuthResponse | null>(null);
  const [delayFinished, setDelayFinished] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await axiosInstance.get("/auth/verify");
        setIsAuthenticated({ ok: response.data.ok });
      } catch (error) {
        setIsAuthenticated({ ok: false });
      }
    };

    verifyAuth();

    const delay = setTimeout(() => setDelayFinished(true), 1000);
    return () => clearTimeout(delay);
  }, []);

  if (isAuthenticated === null || !delayFinished) {
    return <IconLoader size={48}/>;
  }

  return isAuthenticated.ok ? <Outlet /> : <Navigate 
  to="/signIn"
  state={{message: "Você precisa estar logado para acessar esta página."}}
  replace
  />;
};