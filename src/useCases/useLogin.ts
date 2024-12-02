"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axiosInstance from "@/axiosInstance";
import { jwtDecode } from "jwt-decode";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (credentials: { email: string; password: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post("users/login", credentials);
      if (response.data.token) {
        document.cookie = `token=${response.data.token}; path=/; secure;`;
        const decoded = jwtDecode(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success("Connexion réussie !");
        router.push("/");
      } else {
        throw new Error("Données invalides");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la connexion");
      toast.error(
        "Erreur : " + (err.response?.data?.message || "Connexion échouée"),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
