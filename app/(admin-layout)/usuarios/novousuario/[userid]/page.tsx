
import EditarPessoa from "@/components/pessoas/EditarPessoa";
import EditarUsuario from "@/components/usuarios/EditarUsuario";
import { getUsuarioLogado } from "@/utils/getUsuarioLogado";


async function UpdateUsuario({ params }: { params: { userid: string } }) {
  const usuarioLogado = await getUsuarioLogado()
  return (
    <EditarUsuario userid={params.userid} usuario={usuarioLogado}  />
  );
}

export default UpdateUsuario;