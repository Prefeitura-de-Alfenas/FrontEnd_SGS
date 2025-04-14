import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // Get token from NextAuth
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });


  // Se não tiver token ou o token estiver expirado
  if (!token || isTokenExpired(token)) {
    // Redireciona para a página de login (/)
    return NextResponse.next(); // Permite acesso
  }

  // Extraia a URL acessada
  const { pathname } = req.nextUrl;

  // Defina um objeto com permissões baseadas em rotas
  const protectedRoutes: Record<string, string[]> = {
    "/admin": ["Admin"], // Apenas usuários com permissão "admin" podem acessar "/admin"
    "/pessoas": ["Admin", "Comum"], // Tanto "Admin" quanto "Comum" podem acessar "/pessoas" e suas subrotas
  };

  // Acesse o array de roles do caminho correto na estrutura do token
  const userRoles = token.user?.role as string[] | undefined;

  // Verifica se a rota atual está protegida ou se é uma subrota de uma rota protegida
  let requiredRoles: string[] | undefined;
  for (const [protectedPath, roles] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(protectedPath)) {
      requiredRoles = roles;
      break;
    }
  }

  // Verifica se o usuário tem pelo menos uma das roles necessárias
  if (
    requiredRoles &&
    (!userRoles || !userRoles.some((role) => requiredRoles!.includes(role)))
  ) {
    return NextResponse.redirect(new URL("/unauthorized", req.url)); // Redireciona caso não tenha acesso
  }

  return NextResponse.next(); // Permite acesso
}

// Função para verificar se o token expirou
function isTokenExpired(token: any): boolean {
 
  if (!token?.exp) return true; // Se o token não tiver o campo 'exp', considera-se inválido
  const currentTime = Math.floor(Date.now() / 1000); // Tempo atual em segundos
  return token.exp < currentTime; // Retorna true se o token estiver expirado
}

// Configuração para aplicar o middleware APENAS em rotas específicas que precisam de proteção
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // Exclude public routes from middleware
    "/((?!login|register|logout|/).*)", // Adicione '/' aqui
  ],
};
