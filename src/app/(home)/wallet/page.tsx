import { cookies } from "next/headers";

export default async function Wallet() {
  const cookieStore = cookies();

  const response = await fetch(process.env.PAGO_BASE_URL + "/wallet/funds", {
    headers: {
      Authorization: cookieStore.get("token")?.value!,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return (
    <main className="flex m-auto flex-col items-center justify-center w-full h-screen gap-0">
      <span className="text-xl font-bold">
        Saldo:{" "}
        {Intl.NumberFormat("pt-BR", {
          currency: "BRL",
          style: "currency",
        }).format(data.value)}
      </span>
    </main>
  );
}
