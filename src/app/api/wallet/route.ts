import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();

  try {
    if (!cookieStore.get("token")) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const responseData = await fetch(
      "https://api.pagoexpress.com.br/wallet/funds",
      {
        headers: {
          Authorization: cookieStore.get("token")?.value!,
          "Content-Type": "application/json",
        },
      }
    );

    if (!responseData) {
      return Response.json({ message: "Erro na criação" });
    }

    const data = await responseData.json();

    return Response.json(data, {
      status: responseData.status,
    });
  } catch (err) {
    return Response.json({ message: "Erro desconhecido." }, { status: 500 });
  }
}
