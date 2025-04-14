import { ReactNode } from "react";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import Header from "@/components/header/Header";
import { authOptions } from "@/utils/authOptions";
import { signOut } from "next-auth/react";
import { cookies } from "next/headers";
interface PrivaceLayoutProps {
  children: ReactNode;
}

export default async function PrivacyLayout({ children }: PrivaceLayoutProps) {
  const session = await getServerSession(authOptions);
  function isTokenExpired(token: any): boolean {
    if (!token?.exp) return true; // Se o token não tiver o campo 'exp', considera-se inválido
    const currentTime = Math.floor(Date.now() / 1000); // Tempo atual em segundos
    return token.exp < currentTime; // Retorna true se o token estiver expirado
  }

  if(!session) {
    redirect('/')
  }

  // Se a sessão não existir ou o token estiver expirado
  // if (!session || isTokenExpired(session.user)) {
    // Redireciona para a API Route de logout
   // redirect("../api/logout"); token nunca expira se expirar colocar aqui
  //}
 
  return (
    <>
      <Header usuarioLogado={session} />
      {children}
    </>
  );
}
