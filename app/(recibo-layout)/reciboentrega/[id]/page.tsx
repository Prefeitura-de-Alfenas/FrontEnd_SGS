import ReciboDocment from "@/components/entrega/Recibo";
import { getUsuarioLogado } from "@/utils/getUsuarioLogado";

async function Recibo({ params }: { params: { id: string } }) {
  const usuarioLogado = await getUsuarioLogado();
  return ( 
    <ReciboDocment id={params.id} usuario={usuarioLogado}/>
   );
}

export default Recibo;