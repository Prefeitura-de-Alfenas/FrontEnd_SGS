
import EditarPessoa from "@/components/pessoas/EditarPessoa";
import { getUsuarioLogado } from "@/utils/getUsuarioLogado";


async function NewPessoa({ params }: { params: { pessoaId: string } }) {
  const usuarioLogado = await getUsuarioLogado()
  return (
    <EditarPessoa pessoaId={params.pessoaId} usuario={usuarioLogado}  />
  );
}

export default NewPessoa;