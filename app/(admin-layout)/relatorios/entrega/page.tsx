
import TableRelatorioPorData from "@/components/relatorios/entrega/TableRelatorioPorData";
import TablePessoasPorData from "@/components/relatorios/pessoas/pessoaspordata";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";



 async function  EntregaRelatorioPorData() {
  const session = await getServerSession(authOptions) as any
    return ( 
      <TableRelatorioPorData  usuarioLogado={session}  />
     );
}

export default EntregaRelatorioPorData;