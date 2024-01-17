



import TableUsuarios from "@/components/usuarios/TableUsuarios";
import { getUsuarioLogado } from "@/utils/getUsuarioLogado";




 async function  Usuarios() {
  
   const usuarioLogado = await getUsuarioLogado();

    return ( 
     
       <TableUsuarios usuario={usuarioLogado}/>

   
     );
}

export default Usuarios;