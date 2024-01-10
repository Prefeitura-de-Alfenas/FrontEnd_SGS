import TableFamiliares from "@/components/familiares/TableFamiliares";

interface FamiliaresProps{
    params:{
      responsavelId:string
    }
}
function Familiares({params}:FamiliaresProps) {
    return ( 
        <TableFamiliares responsavelId={params.responsavelId}  />
     );
}

export default Familiares;