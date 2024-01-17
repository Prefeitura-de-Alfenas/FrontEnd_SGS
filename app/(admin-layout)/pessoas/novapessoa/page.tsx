import CriarPessoa from "@/components/pessoas/CriarPessoa";
import { getUsuarioLogado } from "@/utils/getUsuarioLogado";


async function NewPessoa() {
  const usuario = await getUsuarioLogado();

  return (
    <CriarPessoa usuario={usuario} />
    );
}

export default NewPessoa;