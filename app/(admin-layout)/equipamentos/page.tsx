import TableEquipamentos from "@/components/equipamentos/TableEquipamentos";
import { getUsuarioLogado } from "@/utils/getUsuarioLogado";


 async function  Equipamentos() {
  
   const usuarioLogado = await getUsuarioLogado();
    return ( 
      <TableEquipamentos  usuario={usuarioLogado}/>
     );
}

export default Equipamentos;