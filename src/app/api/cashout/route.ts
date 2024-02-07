import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();

  if (!cookieStore.get("token")) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const response = await fetch(process.env.PAGO_BASE_URL + "/cashout", {
    headers: {
      Authorization: cookieStore.get("token")?.value!,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return Response.json(data);
}

export async function POST(request: Request) {
  const cookieStore = cookies();
  const requestBody = await request.json();

  if (!cookieStore.get("token")) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const bodyData = {
    amount: requestBody.amount,
    bank: {
      pixKey: requestBody.pixKey,
      pixValue: requestBody.pixValue,
    },
    countryCode: "BRA",
    creationDate: new Date().toISOString(),
    currencyCode: "BRL",
    merchantReference: "TESTE2",
    shopper: {
      docNumber: requestBody.docNumber,
      docType: "1",
      fullName: requestBody.fullName,
      email: requestBody.email,
      mobile: "",
      countryCode: "BRA",
    },
    transferType: "1",
    details: "",
  };

  const responseData = await fetch(process.env.PAGO_BASE_URL + "/cashout", {
    method: "POST",
    body: JSON.stringify(bodyData),
    headers: {
      Authorization: cookieStore.get("token")?.value!,
      "Content-Type": "application/json",
    },
  });

  if (!responseData) {
    return Response.json({ message: "Erro na criação" });
  }

  const data = await responseData.json();

  return Response.json(data, {
    status: responseData.status,
  });
}
