import { baseUrl } from "@/config/base";
import { EntregaCreateI } from "@/interfaces/entras/interface";



const CreateEntrega = async (data:EntregaCreateI) => {
    const url = `${baseUrl}/entregra`;
    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
    const entrega = await response.json() 
 
    return entrega ;
}


export {CreateEntrega}



