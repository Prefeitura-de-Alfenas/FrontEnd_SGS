import TablePessoasBeneficios from "@/components/pessoas/TablePessoasBeneficios";
import { getUsuarioLogado } from "@/utils/getUsuarioLogado";


 async function  Beneficios({ params }: { params: { pessoaId: string } }) {
   const usuarioLogado = await getUsuarioLogado();
    return ( 
      <TablePessoasBeneficios pessoaId={params.pessoaId} usuario={usuarioLogado} />
     );
}

export default Beneficios;