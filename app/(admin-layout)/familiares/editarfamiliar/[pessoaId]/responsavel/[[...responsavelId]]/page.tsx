
import EditarPessoa from "@/components/pessoas/EditarPessoa";
import { getUsuarioLogado } from "@/utils/getUsuarioLogado";

interface UpdateFamiliarProps{
  params:{
    pessoaId:string
    responsavelId?:string
  }
}

async function UpdateFamiliar({ params }: UpdateFamiliarProps) {
  const usuarioLogado = await getUsuarioLogado()
  return (
    <EditarPessoa pessoaId={params.pessoaId}  responsavelId={params.responsavelId} usuario={usuarioLogado} />
  ); 
}

export default UpdateFamiliar;