import TableRelatorioRma from "@/components/relatorios/rma/rma";

import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";



 async function  RelatorioRMA() {
  const session = await getServerSession(authOptions) as any
    return ( 
      <TableRelatorioRma  usuarioLogado={session}  />
     );
}

export default RelatorioRMA;