"use client";

import { deletePayment } from "@/services/cashin";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface DeleteButtonParams {
  cashinId: string;
  status: number;
}

export function DeleteButton({ cashinId, status }: DeleteButtonParams) {
  const router = useRouter();

  async function handleDeleteCashin() {
    await deletePayment(cashinId)
      .then(() => toast.success("Cancelado com sucesso!"))
      .catch(() => toast.error("Erro ao excluir."));

    router.refresh();
  }

  return (
    <button
      className="leading-none w-7 bg-red-500 aspect-square rounded-md text-white font-bold hover:bg-red-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
      onClick={handleDeleteCashin}
      disabled={status !== 10}
    >
      X
    </button>
  );
}
