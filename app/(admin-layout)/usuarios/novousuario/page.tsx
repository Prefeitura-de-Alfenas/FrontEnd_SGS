
import NewUsuario from "@/components/usuarios/NewUsuario";

import { getUsuarioLogado } from "@/utils/getUsuarioLogado";


async function NovoUsuario() {
  const usuario = await getUsuarioLogado();

  return (
    <NewUsuario usuario={usuario} />
    );
}

export default NovoUsuario;