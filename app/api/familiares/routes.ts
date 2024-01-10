import { baseUrl } from "@/config/base";


const GetFamiliares = async (id:string,skip:number,filter:string) => {
    const url = `${baseUrl}/pessoa/familiares/${id}/2/skip/${skip}/${filter}`;
    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
    })

    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
    const familiares = await response.json() 
 
    return familiares ;
    
}

const changeReponsavelFamiliar = async (id:string) =>{
   const url = `${baseUrl}/pessoa/changeresponsavel/${id}`;
   const response = await fetch(url,{
    method:'PATCH',
    headers: {
        'Content-Type': 'application/json'
    }
   })

   if(!response.ok){
    throw new Error('Conexão com a rede está com problemas')
   }

   const resultado = await response.json();
   return resultado;
}

export {GetFamiliares,changeReponsavelFamiliar}