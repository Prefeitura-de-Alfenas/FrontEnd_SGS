import TablePessoas from "@/components/pessoas/TablePessoas";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";



 async function  Pessoas() {
  const session = await getServerSession(authOptions) as any
    return ( 
      <TablePessoas  usuarioLogado={session}  />
     );
}

export default Pessoas;