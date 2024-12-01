import { useState } from "react";
import { CreateUser, Role } from "../models/User";
import { userService } from "@/services/userServices";

export const useCreateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async (data: Omit<CreateUser, "role">) => {
    setIsLoading(true);
    setError(null);

    try {
      const userData = { ...data, role: Role.CLIENT };
      const user = await userService.createUser(userData);
      return user;
    } catch (err: any) {
      setError(err.response?.data?.message || "Une erreur est survenue.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createUser, isLoading, error };
};
