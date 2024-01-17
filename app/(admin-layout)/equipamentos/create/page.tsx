import CriarEquipamento from "@/components/equipamentos/CreateEquipamentos";
import { getUsuarioLogado } from "@/utils/getUsuarioLogado";



async function NewEquipamento() {
  const usuarioLogado = await getUsuarioLogado();
  return (
    <CriarEquipamento usuario={usuarioLogado} />
    );
}

export default NewEquipamento;