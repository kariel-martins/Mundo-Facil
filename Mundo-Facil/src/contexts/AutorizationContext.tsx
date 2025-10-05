import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";

interface AuthState {
  ok: boolean;
}

export function Autorization() {
  const [auth, setAuth] = useState<AuthState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get("/auth/verify");
        setAuth({
          ok: response.data.ok,
        });
      } catch {
        setAuth({ ok: false });
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { auth, loading };
}
