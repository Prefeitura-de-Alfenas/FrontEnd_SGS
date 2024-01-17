import GerarEntrega from "@/components/entrega/GerarEntrega";

import { getServerSession } from "next-auth";
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";
import { authOptions } from "@/utils/authOptions";

async function Entrega({ params }: { params: { pessoaId: string } }) {
    const session = await getServerSession(authOptions) as UsuarioLogadoI
    return (  
        <GerarEntrega pessoaId={params.pessoaId} userLogado={session} />
    );
}
export default Entrega;
