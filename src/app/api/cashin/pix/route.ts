import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const req = await request.json();

  try {
    if (!cookieStore.get("token")) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const bodyData = {
      creationTime: new Date().toISOString(),
      paymentMethod: 1,
      expirationTime: req.expirationTime || 5,
      urlConfirmation: "http://localhost:3000/confirmation",
      checkoutType: 1,
      shopper: {
        docNumber: req.docNumber,
        docType: "1",
        fullName: req.fullName,
        email: req.email,
        mobile: req.mobile,
        countryCode: "BRA",
      },
      transaction: {
        amount: req.amount,
        countryCode: "BRA",
        currencyCode: "BRL",
        salesId: "TESTE_0002",
        details: req.details,
      },
    };

    const response = await fetch(process.env.PAGO_BASE_URL + "/cashin", {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        Authorization: cookieStore.get("token")?.value!,
        "Content-Type": "application/json",
      },
    });

    if (!response) {
      return Response.json({ message: "Erro na criação" });
    }

    const data = await response.json();

    return Response.json(data, {
      status: response.status,
    });
  } catch (err) {
    return Response.json({ message: "Erro desconhecido." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const cookieStore = cookies();
  const req = await request.json();

  if (!cookieStore.get("token")) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  await fetch(process.env.PAGO_BASE_URL + "/cashin/" + req.cashinId, {
    method: "DELETE",
    headers: {
      Authorization: cookieStore.get("token")?.value!,
      "Content-Type": "application/json",
    },
  });

  return Response.json({});
}
