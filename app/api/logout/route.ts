import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Exclui o cookie de sessão
  const cookieStore = cookies();
  cookieStore.set("next-auth.session-token", "", { maxAge: -1 }); // Exclui o cookie de sessão
  
  // Obter a URL de origem da requisição para construir a URL absoluta
  const baseUrl = new URL(request.url).origin;
  
  // Redireciona para a página de logout
  return NextResponse.redirect(`${baseUrl}/logout`);
}
