import GerarEntrega from "@/components/entrega/GerarEntrega";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";

async function Entrega({ params }: { params: { pessoaId: string } }) {
    const session = await getServerSession(nextAuthOptions) as UsuarioLogadoI
    return (  
        <GerarEntrega pessoaId={params.pessoaId} userLogado={session} />
    );
}
export default Entrega;
