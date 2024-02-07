import { api } from "@/utils/api";

interface AuthData {
  accessToken: string;
  type: string;
}

export async function authUser() {
  const response = await api.post<AuthData>("/auth");

  return response.data;
}
