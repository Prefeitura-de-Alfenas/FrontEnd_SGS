



import { getServerSession } from "next-auth";
import TablePessoasInativas from "@/components/admin/TablePessoasInativas";
import { authOptions } from "@/utils/authOptions";



 async function  PessoasInativas() {
  const session = await getServerSession(authOptions) as any
    return ( 
      <TablePessoasInativas  usuarioLogado={session}  />
     );
}

export default PessoasInativas;