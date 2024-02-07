"use client";

import toast, { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/utils/query";
import { FaRegUser } from "react-icons/fa";
import { authUser } from "@/services/auth";
import { setCookie } from "nookies";
import Link from "next/link";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  async function handleLogUser() {
    const response = await authUser();

    setCookie(null, "token", `${response.type} ${response.accessToken}`, {
      path: "/",
      maxAge: 60 * 60 * 60,
    });

    toast.success("Logado!");
  }

  return (
    <QueryClientProvider client={queryClient}>
      <header className="absolute top-0 w-full py-4 px-8 flex items-center justify-between shadow-md bg-zinc-700">
        <nav>
          <ul className="flex items-center gap-12 text-white uppercase font-semibold">
            <li>
              <Link href="/">Criar Cashin</Link>
            </li>
            <li>
              <Link href="/cashins">Cashins</Link>
            </li>
            <li>
              <Link href="/cashouts">Cashouts</Link>
            </li>
            <li>
              <Link href="/cashouts/create">Criar cashout</Link>
            </li>
          </ul>
        </nav>

        <button
          className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg text-lg font-semibold transition text-white flex items-center justify-center gap-2"
          onClick={handleLogUser}
        >
          <FaRegUser />
          Logar
        </button>
      </header>

      {children}
      <Toaster />
    </QueryClientProvider>
  );
}
