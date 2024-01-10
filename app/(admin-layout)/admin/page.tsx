import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";


async function Usuario() {
    const session = await getServerSession(nextAuthOptions) as any
   
    return ( 
        <>

        <h1>{JSON.stringify(session,null,2)}</h1>
        </>
     );
}

export default Usuario
