import EditarBeneficio from "@/components/beneficios/EditarBeneficio";
import { getUsuarioLogado } from "@/utils/getUsuarioLogado";




async function EditEquipamento({ params }: { params: { id: string } }) {
  const usuarioLogado = await getUsuarioLogado()
  return (
    <EditarBeneficio beneficioId={params.id} usuario={usuarioLogado}/>
    );
}

export default EditEquipamento;