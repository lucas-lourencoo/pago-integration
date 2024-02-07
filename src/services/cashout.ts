import { api } from "@/utils/api";

interface GetPaymentsParams {
  startDate?: string;
  endDate?: string;
  page?: number;
}

interface GetPaymentsData {
  page: number;
  totalPages: number;
  totalElements: number;
  content: {
    uniqueId: string;
    creationTime: string;
    status: number;
    salesId: string;
    amount: number;
  }[];
}

export async function getPayments(params?: GetPaymentsParams) {
  const response = await api.get<GetPaymentsData>("/cashout", {
    params,
  });

  return response;
}

interface CreateCheckoutParams {
  docNumber: string;
  fullName: string;
  email: string;
  mobile: string;
  amount: number;
  details?: string;
  pixKey: string;
  pixValue: string;
}

export async function createCheckout(data?: CreateCheckoutParams) {
  const response = await api.post<GetPaymentsData>("/cashout", data);

  return response;
}
