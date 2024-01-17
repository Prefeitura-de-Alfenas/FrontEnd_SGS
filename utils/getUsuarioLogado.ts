import { UsuarioLogadoI } from "@/interfaces/usuario/interface";
import { authOptions } from "@/utils/authOptions";

import { getServerSession } from "next-auth";

export async function getUsuarioLogado(){
    const session = await getServerSession(authOptions) as UsuarioLogadoI
    return session;
}