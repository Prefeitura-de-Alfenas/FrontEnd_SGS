import CriarPessoa from "@/components/pessoas/CriarPessoa";
import { getUsuarioLogado } from "@/utils/getUsuarioLogado";


async function NewFamiliar({ params }: { params: { responsavelId: string } }) {
  const usuarioLogado = await getUsuarioLogado()
  return (
    <CriarPessoa resonposavelId={params.responsavelId} usuario={usuarioLogado}/>
    );
}

export default NewFamiliar;