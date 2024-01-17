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

const GetEntregaById = async (id:string)=>{
    const url = `${baseUrl}/entregra/${id}`;
    const response = await fetch(url,{
        method:'GET',
        headers:{
            'Content-type': 'application/json'
        }
    })

    if(!response.ok) {
        throw new Error("Conexão com a rede está com problemaas");
    }
    
   
    const entrega = await response.json();
    

    return entrega;
}

const GetEntregas = async (skip:number,filter:string) => {

    const url = `${baseUrl}/entregra/findall/10/skip/${skip}/${filter}`;	
    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
    })

    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
    const entregas = await response.json() 
 
    return entregas ;
    
}

const GetEntregasPorPessoa = async (pessoaId:string,skip:number,filter:string) => {

    const url = `${baseUrl}/entregra/findallforpessoas/${pessoaId}/take/10/skip/${skip}/${filter}`;	
    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
    })

    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
    const entregas = await response.json() 
 
    return entregas ;
    
}


export {CreateEntrega,GetEntregaById,GetEntregas,GetEntregasPorPessoa}



