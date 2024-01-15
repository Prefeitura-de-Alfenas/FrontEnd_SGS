import TablePessoasBeneficios from "@/components/pessoas/TablePessoasBeneficios";


 function  Beneficios({ params }: { params: { pessoaId: string } }) {

    return ( 
      <TablePessoasBeneficios pessoaId={params.pessoaId}  />
     );
}

export default Beneficios;