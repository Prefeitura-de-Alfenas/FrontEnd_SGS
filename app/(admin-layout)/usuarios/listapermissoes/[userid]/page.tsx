



import TablePermissoes from "@/components/usuarios/TablePermissoes";
import { getUsuarioLogado } from "@/utils/getUsuarioLogado";




 async function  Permissoes({ params }: { params: { userid: string } }) {
   const usuarioLogado = await getUsuarioLogado()
    const id = params.userid as string;
    return ( 
     
       <TablePermissoes userId={id} usuario={usuarioLogado} />

   
     );
}

export default Permissoes;