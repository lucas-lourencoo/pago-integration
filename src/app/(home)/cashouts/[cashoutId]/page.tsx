import { cookies } from "next/headers";
import Image from "next/image";

interface CashOutParams {
  params: {
    cashoutId: string;
  };
}

interface CashOutData {
  uniqueId: string;
  paymentMethod: number;
  amount: number;
  requestDateTime: string;
  status: string;
  statusCode: number;
  bankCode: string;
  qrCode: string;
  pixCopyPaste: string;
  event: {
    status: string;
    eventDateTime: string;
  }[];
}

export default async function CashOutSingle({ params }: CashOutParams) {
  const cookieStore = cookies();

  const response = await fetch(
    process.env.PAGO_BASE_URL + `/cashout/${params.cashoutId}`,
    {
      headers: {
        Authorization: cookieStore.get("token")?.value!,
        "Content-Type": "application/json",
      },
    }
  );

  const data: CashOutData = await response.json();

  return (
    <main className="flex m-auto flex-col items-center justify-center w-full h-screen gap-0">
      <Image
        src={`data:image/png;base64,${data?.qrCode}`}
        alt="QR code"
        width={230}
        height={230}
      />
      <input
        type="text"
        readOnly
        value={data?.pixCopyPaste}
        className="px-3 py-2 text-lg w-full max-w-[30%] rounded-lg border-2"
      />
      <span className="mt-4 text-xl font-bold">
        Valor total:{" "}
        {Intl.NumberFormat("pt-BR", {
          currency: "BRL",
          style: "currency",
        }).format(Number(data?.amount))}
      </span>
    </main>
  );
}
