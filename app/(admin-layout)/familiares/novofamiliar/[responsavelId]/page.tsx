import CriarPessoa from "@/components/pessoas/CriarPessoa";


function NewFamiliar({ params }: { params: { responsavelId: string } }) {
  return (
    <CriarPessoa resonposavelId={params.responsavelId}/>
    );
}

export default NewFamiliar;