
import EditarEquipamento from "@/components/equipamentos/EditEquipamento";
import { getUsuarioLogado } from "@/utils/getUsuarioLogado";



async function EditEquipamento({ params }: { params: { id: string } }) {
  const usuarioLogado = await getUsuarioLogado();
  return (
    <EditarEquipamento equipamentoId={params.id} usuario={usuarioLogado}/>
    );
}

export default EditEquipamento;