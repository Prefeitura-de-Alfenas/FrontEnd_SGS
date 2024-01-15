import TablePessoas from "@/components/pessoas/TablePessoas";


import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";



 async function  Pessoas() {
  const session = await getServerSession(nextAuthOptions) as any
    return ( 
      <TablePessoas  usuarioLogado={session}  />
     );
}

export default Pessoas;