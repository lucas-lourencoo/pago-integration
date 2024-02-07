"use client";

import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { payPix } from "@/services/cashin";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  document: z
    .string()
    .max(14, "Deve ter no máximo 11 dígitos.")
    .min(14, "Deve ter no mínimo 11 dígitos.")
    .transform((value) => value.replaceAll(".", "").replace("-", "")),
  phone: z.string(),
  amount: z.string().transform((value) => Number(value)),
});

type UserFormData = z.infer<typeof userSchema>;

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const router = useRouter();

  const { mutate: mutatePix, isPending } = useMutation({
    mutationKey: ["pay-pix"],
    mutationFn: payPix,
  });

  async function handlePayPix(data: UserFormData) {
    mutatePix(
      {
        amount: data.amount,
        docNumber: data.document,
        email: data.email,
        fullName: data.name,
        mobile: data.phone,
      },
      {
        onSuccess: (data) => {
          router.push(`/checkout/${data.paymentId}`);
        },
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
  }

  return (
    <main className="flex m-auto flex-col items-center justify-center w-full h-screen gap-8 bg-zinc-100">
      <h1 className="text-4xl font-bold text-zinc-800">Criar CashIn</h1>
      <form action="" className="flex flex-col w-full gap-4 max-w-[520px]">
        <input
          type="text"
          placeholder="Nome completo"
          className="p-3 border border-zinc-300 rounded-lg"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="p-3 border border-zinc-300 rounded-lg"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        )}

        <InputMask
          type="text"
          placeholder="CPF"
          className="p-3 border border-zinc-300 rounded-lg"
          mask="999.999.999-99"
          maskPlaceholder=""
          maskChar={null}
          {...register("document")}
        />
        {errors.document && (
          <p className="text-red-500 text-sm">{errors.document?.message}</p>
        )}

        <InputMask
          type="tel"
          placeholder="Telefone"
          className="p-3 border border-zinc-300 rounded-lg"
          mask="(99) 99999-9999"
          maskPlaceholder=""
          maskChar={null}
          {...register("phone")}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone?.message}</p>
        )}

        <input
          type="number"
          placeholder="Valor"
          className="p-3 border border-zinc-300 rounded-lg"
          {...register("amount")}
        />

        {errors.amount && (
          <p className="text-red-500 text-sm">{errors.amount?.message}</p>
        )}
      </form>

      <button
        className="py-3 px-6 bg-blue-600 rounded-lg hover:bg-blue-500 text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
        onClick={handleSubmit(handlePayPix)}
        disabled={isPending}
      >
        Pagar com PIX
      </button>
    </main>
  );
}
