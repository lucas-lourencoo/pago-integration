"use client";

import { refundRequest } from "@/services/cashin";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LuRefreshCcw } from "react-icons/lu";

interface RefundButtonProps {
  payment: {
    uniqueId: string;
    creationTime: string;
    status: string;
    salesId: string;
    amount: number;
  };
}

export function RefundButton({ payment }: RefundButtonProps) {
  const router = useRouter();

  async function handleCreateRefund() {
    await refundRequest({
      uniqueId: payment.uniqueId,
      returnAmount: payment.amount,
    })
      .then(() => toast.success("Reembolso criado com sucesso!"))
      .catch(() => toast.error("Erro ao criar o reembolso."));

    router.refresh();
  }

  return (
    <button
      title="Reembolso"
      disabled={Number(payment.status) !== 32}
      className="leading-none w-7 bg-green-500 aspect-square rounded-md text-white font-bold [&:not(:disabled)]:hover:bg-green-700 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
      onClick={handleCreateRefund}
    >
      <LuRefreshCcw strokeWidth={3} />
    </button>
  );
}
