import { baseUrl, takeBase } from "@/config/base";
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";


const GetFamiliares = async (usuario:UsuarioLogadoI,id:string,skip:number,filter:string) => {
    const url = `${baseUrl}/pessoa/familiares/${id}/${takeBase}/skip/${skip}/${filter}`;
    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization' :`Bearer ${usuario.user.access_token}`
        },
    })

    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
    const familiares = await response.json() 
 
    return familiares ;
    
}

const changeReponsavelFamiliar = async (usuario:UsuarioLogadoI,id:string) =>{
   const url = `${baseUrl}/pessoa/changeresponsavel/${id}`;
   const response = await fetch(url,{
    method:'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'Authorization' :`Bearer ${usuario.user.access_token}`
    }
   })

   if(!response.ok){
    throw new Error('Conexão com a rede está com problemas')
   }

   const resultado = await response.json();
   return resultado;
}

export {GetFamiliares,changeReponsavelFamiliar}