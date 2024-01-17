import CriarBeneficio from "@/components/beneficios/CreateBeneficio";
import { getUsuarioLogado } from "@/utils/getUsuarioLogado";




async function NewBeneficio() {
  const usuarioLogado = await getUsuarioLogado()
  return (
    <CriarBeneficio usuario={usuarioLogado}/>
    );
}

export default NewBeneficio;