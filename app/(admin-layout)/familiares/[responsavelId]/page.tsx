import TableFamiliares from "@/components/familiares/TableFamiliares";
import { getUsuarioLogado } from "@/utils/getUsuarioLogado";

interface FamiliaresProps{
    params:{
      responsavelId:string
    }
}
async function Familiares({params}:FamiliaresProps) {
  const usuarioLogado = await getUsuarioLogado()
    return ( 
        <TableFamiliares responsavelId={params.responsavelId}  usuario={usuarioLogado}/>
     );
}

export default Familiares;