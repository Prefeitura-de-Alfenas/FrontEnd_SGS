import TableEntregaAvulsa from "@/components/entrega/TableAvulsa";

import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";



 async function  EntregaAvulsa() {
  const session = await getServerSession(authOptions) as any
    return ( 
      <TableEntregaAvulsa  usuarioLogado={session}  />
     );
}

export default EntregaAvulsa;