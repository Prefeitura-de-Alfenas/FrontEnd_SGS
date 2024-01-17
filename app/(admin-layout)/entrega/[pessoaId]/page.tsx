import TableEntregas from "@/components/entrega/TableEntregas";








 function  Entregas({ params }: { params: { pessoaId: string } }) {

    return ( 
      <TableEntregas pessoaId={params.pessoaId} />
     );
}

export default Entregas;