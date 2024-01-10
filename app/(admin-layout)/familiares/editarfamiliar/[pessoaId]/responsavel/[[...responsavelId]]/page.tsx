
import EditarPessoa from "@/components/pessoas/EditarPessoa";

interface UpdateFamiliarProps{
  params:{
    pessoaId:string
    responsavelId?:string
  }
}

function UpdateFamiliar({ params }: UpdateFamiliarProps) {
  
  return (
    <EditarPessoa pessoaId={params.pessoaId}  responsavelId={params.responsavelId} />
  ); 
}

export default UpdateFamiliar;