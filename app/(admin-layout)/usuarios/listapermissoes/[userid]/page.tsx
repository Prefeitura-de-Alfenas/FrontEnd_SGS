



import TablePermissoes from "@/components/usuarios/TablePermissoes";




 function  Permissoes({ params }: { params: { userid: string } }) {
  
    const id = params.userid as string;
    return ( 
     
       <TablePermissoes userId={id} />

   
     );
}

export default Permissoes;