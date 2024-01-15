import EditarBeneficio from "@/components/beneficios/EditarBeneficio";




function EditEquipamento({ params }: { params: { id: string } }) {
  return (
    <EditarBeneficio beneficioId={params.id}/>
    );
}

export default EditEquipamento;