import { useMutation } from "@tanstack/react-query";
import apiClient from "../lib/api";
import type { User } from "../../../packages/types/index.js";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
  username: string;
}

interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export function useLogin() {
  const mutation = useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: async (credentials) => {
      const response = await apiClient.post("/auth/login", credentials);
      return response.data;
    },
  });
  return mutation;
}

export function useRegister() {
  const mutation = useMutation<AuthResponse, Error, RegisterCredentials>({
    mutationFn: async (credentials) => {
      const response = await apiClient.post("/auth/register", credentials);
      return response.data;
    },
  });
  return mutation;
}
