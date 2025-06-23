"use client"
import React from 'react';
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
export default function UnauthorizedComponent() {
    const router = useRouter();
    async function logount() {
        await signOut({
          redirect: false,
        });
        router.replace("/");
      }
     
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold mb-4">Você não está autorizado</h1>
        <p className="text-lg mb-8">
          Parece que você não tem permissão para acessar esta página.
        </p>
        <button
            onClick={logount}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded shadow transition duration-200"
        >
          Sair
        </button>
      </div>
    </div>
  );
}