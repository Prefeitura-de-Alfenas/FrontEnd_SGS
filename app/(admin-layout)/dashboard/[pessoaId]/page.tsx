import VisualizarDados from "@/components/dashboard/VisualizarDados";
import { getUsuarioLogado } from "@/utils/getUsuarioLogado";

 async function  Entregas({ params }: { params: { pessoaId: string } }) {
  const usuarioLogado = await getUsuarioLogado();
    return ( 
      <VisualizarDados pessoaId={params.pessoaId} userLogado={usuarioLogado} />
     );
}

export default Entregas;