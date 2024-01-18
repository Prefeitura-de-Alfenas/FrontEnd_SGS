
import TablePessoasPorData from "@/components/relatorios/pessoas/pessoaspordata";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";



 async function  PessoasRelatorioPorData() {
  const session = await getServerSession(authOptions) as any
    return ( 
      <TablePessoasPorData  usuarioLogado={session}  />
     );
}

export default PessoasRelatorioPorData;