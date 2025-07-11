import CartaoPDF from "@/components/pessoas/Cartao";
import { getUsuarioLogado } from "@/utils/getUsuarioLogado";

async function Cartao({ params }: { params: { id: string } }) {
  const usuarioLogado = await getUsuarioLogado();
  const link = `${process.env.LINK_QRCODE}/${params.id}`;
  return <CartaoPDF id={params.id} link={link} usuario={usuarioLogado} />;
}

export default Cartao;
