import TableEntregas from "@/components/entrega/TableEntregas";
import { getUsuarioLogado } from "@/utils/getUsuarioLogado";








 async function  Entregas({ params }: { params: { pessoaId: string } }) {
  const usuarioLogado = await getUsuarioLogado();
    return ( 
      <TableEntregas pessoaId={params.pessoaId} usuario={usuarioLogado} />
     );
}

export default Entregas;