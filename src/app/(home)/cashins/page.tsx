import { StatusCode } from "@/constants/status";
import { cookies } from "next/headers";
import { DeleteButton } from "./components/DeleteButton";
import { LuRefreshCcw } from "react-icons/lu";
import { RefundButton } from "./components/RefundButton";

interface GetPaymentsData {
  page: number;
  totalPages: number;
  totalElements: number;
  content: {
    uniqueId: string;
    creationTime: string;
    status: string;
    salesId: string;
    amount: number;
  }[];
}

export default async function Payments() {
  const cookieStore = cookies();

  const response = await fetch(process.env.PAGO_BASE_URL + "/cashin", {
    headers: {
      Authorization: cookieStore.get("token")?.value!,
      "Content-Type": "application/json",
    },
  });

  const data: GetPaymentsData = await response.json();

  return (
    <main className="flex m-auto flex-col items-center justify-center w-full h-screen gap-8 bg-zinc-100">
      <h1 className="text-4xl font-bold text-zinc-800 mt-8">Listar CashIns</h1>
      <table className="w-full max-w-5xl bg-white border-spacing-4 overflow-auto">
        <thead className="text-center">
          <tr>
            <th className="p-2 border border-gray-400 bg-blue-100">Id</th>
            <th className="p-2 border border-gray-400 bg-blue-100">Status</th>
            <th className="p-2 border border-gray-400 bg-blue-100">Valor</th>
            <th className="p-2 border border-gray-400 bg-blue-100">
              Data de criação
            </th>
            <th className="p-2 border border-gray-400 bg-blue-100">Ações</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data?.content.map((item) => (
            <tr key={item.uniqueId}>
              <td className="p-1 border border-gray-400">{item.uniqueId}</td>
              <td className="p-1 border border-gray-400">
                {StatusCode[Number(item.status)]}
              </td>
              <td className="p-1 border border-gray-400">
                {Intl.NumberFormat("pt-BR", {
                  currency: "BRL",
                  style: "currency",
                }).format(item.amount)}
              </td>
              <td className="p-1 border border-gray-400">
                {new Date(item.creationTime).toLocaleString()}
              </td>
              <td className="p-1 border border-gray-400">
                <div className="flex items-center justify-center gap-2">
                  <RefundButton payment={item} />
                  <DeleteButton
                    cashinId={item.uniqueId}
                    status={Number(item.status)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
