
import EditarPessoa from "@/components/pessoas/EditarPessoa";


function NewPessoa({ params }: { params: { pessoaId: string } }) {
  return (
    <EditarPessoa pessoaId={params.pessoaId}  />
  );
}

export default NewPessoa;