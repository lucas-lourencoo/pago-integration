import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const req = await request.json();

  try {
    if (!cookieStore.get("token")) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const bodyData = {
      uniqueId: req.uniqueId,
      returnAmount: req.returnAmount,
      creationTime: new Date().toISOString(),
      details: "",
    };

    const response = await fetch(
      process.env.PAGO_BASE_URL + "/cashin/reversal",
      {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: {
          Authorization: cookieStore.get("token")?.value!,
          "Content-Type": "application/json",
        },
      }
    );

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
