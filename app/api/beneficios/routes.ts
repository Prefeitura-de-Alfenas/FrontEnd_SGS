import { baseUrl, takeBase } from "@/config/base";
import { BeneficiosCreateI } from "@/interfaces/beneficios/inteface";
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";


const GetBeneficios = async (usuario:UsuarioLogadoI,skip:number,filter:string) => {

    const url = `${baseUrl}/beneficio/findall/${takeBase}/skip/${skip}/${filter}`;	
    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization' :`Bearer ${usuario.user.access_token}`

        },
    })
   
    if (response.statusText === 'Unauthorized') {
        throw new Error("Você não tem autorização")
     }
  
    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
 
    const beneficios = await response.json() 
 
    return beneficios ;
    
}
const GetBeneficiosAll = async (usuario:UsuarioLogadoI) => {

    const url = `${baseUrl}/beneficio/getall`;	
    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization' :`Bearer ${usuario.user.access_token}`

        },
    })
   
    if (response.statusText === 'Unauthorized') {
        throw new Error("Você não tem autorização")
     }
  
    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
 
    const beneficios = await response.json() 
 
    return beneficios ;
    
}


const CreateBeneficio = async (usuario:UsuarioLogadoI,data:BeneficiosCreateI) => {
    const url = `${baseUrl}/beneficio`;
    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization' :`Bearer ${usuario.user.access_token}`
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
    const beneficio = await response.json() 
 
    return beneficio ;
}

const UpdateBeneficio = async (usuario:UsuarioLogadoI,id:string,data:BeneficiosCreateI) => {
    const url = `${baseUrl}/beneficio/${id}`;
    const response = await fetch(url,{
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            'Authorization' :`Bearer ${usuario.user.access_token}`
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
    const beneficio = await response.json() 
 
    return beneficio ;
}

const GetBeneficioById = async (usuario:UsuarioLogadoI,id:string)=>{
    const url = `${baseUrl}/beneficio/${id}`;
    const response = await fetch(url,{
        method:'GET',
        headers:{
            'Content-type': 'application/json',
            'Authorization' :`Bearer ${usuario.user.access_token}`
        }
    })

    if(!response.ok) {
        throw new Error("Conexão com a rede está com problemaas");
    }
    
   
    const beneficio = await response.json();
    

    return beneficio;
}

export{CreateBeneficio,UpdateBeneficio,GetBeneficioById,GetBeneficios,GetBeneficiosAll}