import TableArquivos from "@/components/arquivo/TableArquivos";
import { getUsuarioLogado } from "@/utils/getUsuarioLogado";

 async function  Arquivo({ params }: { params: { pessoaId: string } }) {
  const usuarioLogado = await getUsuarioLogado();
    return ( 
      <TableArquivos pessoaId={params.pessoaId} usuario={usuarioLogado} />
     );
}

export default Arquivo;