import TableBeneficios from "@/components/beneficios/TableBeneficios";
import { getUsuarioLogado } from "@/utils/getUsuarioLogado";








 async function  Beneficios() {
   const usuarioLogado = await getUsuarioLogado();
    return ( 
      <TableBeneficios usuario={usuarioLogado} />
     );
}

export default Beneficios;