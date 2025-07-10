import { getServerSession } from "next-auth";
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";
import { authOptions } from "@/utils/authOptions";
import GerarEntregaAvulsa from "@/components/entrega/GerarEntregaAvulsa";

async function CreateEntregaAvulsa({ params }: { params: { pessoaId: string } }) {
    const session = await getServerSession(authOptions) as UsuarioLogadoI
    return (  
        <GerarEntregaAvulsa userLogado={session} />
    );
}
export default CreateEntregaAvulsa;
