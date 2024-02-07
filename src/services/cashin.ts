import { api } from "@/utils/api";

interface PayPixParams {
  expirationTime?: number;
  docNumber: string;
  fullName: string;
  email: string;
  mobile: string;
  amount: number;
  details?: string;
}

interface PayPixData {
  uniqueId: string;
  creationTime: string;
  expirationTime: string;
  idMerchant: number;
  paymentInstructions: {
    qrCode: string;
    code: string;
  };
  paymentId: string;
  paymentMethod: number;
  transaction: {
    salesId: string;
    amount: number;
    countryCode: string;
    currencyCode: string;
    status: number;
  };
  shopper: {
    fullName: string;
    docType: number;
    docNumber: string;
    countryCode: string;
    email: string;
    mobile: string;
  };
}

export async function payPix(data: PayPixParams) {
  const response = await api.post<PayPixData>("/cashin/pix", data);

  return response.data;
}

export async function deletePayment(cashinId: string) {
  const response = await api.delete("/cashin/pix", {
    data: {
      cashinId,
    },
  });

  return response.data;
}

interface RefundRequestParams {
  uniqueId: string;
  returnAmount: number;
  details?: string;
}

export async function refundRequest(data: RefundRequestParams) {
  const response = await api.post("/cashin/pix/refund", data);

  return response.data;
}
