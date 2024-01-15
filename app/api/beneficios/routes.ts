import { baseUrl } from "@/config/base";
import { BeneficiosCreateI } from "@/interfaces/beneficios/inteface";


const GetBeneficios = async (skip:number,filter:string) => {

    const url = `${baseUrl}/beneficio/findall/10/skip/${skip}/${filter}`;	
    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
    })

    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
    const beneficios = await response.json() 
 
    return beneficios ;
    
}


const CreateBeneficio = async (data:BeneficiosCreateI) => {
    const url = `${baseUrl}/beneficio`;
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
    const beneficio = await response.json() 
 
    return beneficio ;
}

const UpdateBeneficio = async (id:string,data:BeneficiosCreateI) => {
    const url = `${baseUrl}/beneficio/${id}`;
    const response = await fetch(url,{
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
    const beneficio = await response.json() 
 
    return beneficio ;
}

const GetBeneficioById = async (id:string)=>{
    const url = `${baseUrl}/beneficio/${id}`;
    const response = await fetch(url,{
        method:'GET',
        headers:{
            'Content-type': 'application/json'
        }
    })

    if(!response.ok) {
        throw new Error("Conexão com a rede está com problemaas");
    }
    
   
    const beneficio = await response.json();
    

    return beneficio;
}

export{CreateBeneficio,UpdateBeneficio,GetBeneficioById,GetBeneficios}