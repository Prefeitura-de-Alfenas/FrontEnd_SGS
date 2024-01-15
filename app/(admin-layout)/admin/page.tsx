import TablePessoas from "@/components/pessoas/TablePessoas";


import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import TablePessoasInativas from "@/components/admin/TablePessoasInativas";



 async function  PessoasInativas() {
  const session = await getServerSession(nextAuthOptions) as any
    return ( 
      <TablePessoasInativas  usuarioLogado={session}  />
     );
}

export default PessoasInativas;