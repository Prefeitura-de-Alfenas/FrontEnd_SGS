
import EditarEquipamento from "@/components/equipamentos/EditEquipamento";



function EditEquipamento({ params }: { params: { id: string } }) {
  return (
    <EditarEquipamento equipamentoId={params.id}/>
    );
}

export default EditEquipamento;