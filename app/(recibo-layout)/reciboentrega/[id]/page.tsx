import ReciboDocment from "@/components/entrega/Recibo";

function Recibo({ params }: { params: { id: string } }) {
  return ( 
    <ReciboDocment id={params.id}/>
   );
}

export default Recibo;