import { baseUrl } from "@/config/base";
import { EquipamentoCreateI } from "@/interfaces/equipamento/interface";

const GetEquipamentos = async (skip:number,filter:string) => {

    const url = `${baseUrl}/equipamento/findall/10/skip/${skip}/${filter}`;	
    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
    })

    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
    const equipamentos = await response.json() 
 
    return equipamentos ;
    
}
const GetEquipamentosAll = async () => {

    const url = `${baseUrl}/equipamento`;	
    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
    })

    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
    const equipamentos = await response.json() 
 
    return equipamentos ;
    
}

const CreateEquipamento = async (data:EquipamentoCreateI) => {
    const url = `${baseUrl}/equipamento`;
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
    const equipamento = await response.json() 
 
    return equipamento ;
}

const UpdateEquipamento = async (id:string,data:EquipamentoCreateI) => {
    const url = `${baseUrl}/equipamento/${id}`;
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
    const equipamento = await response.json() 
 
    return equipamento ;
}

const GetEquipamentoById = async (id:string)=>{
    const url = `${baseUrl}/equipamento/${id}`;
    const response = await fetch(url,{
        method:'GET',
        headers:{
            'Content-type': 'application/json'
        }
    })

    if(!response.ok) {
        throw new Error("Conexão com a rede está com problemaas");
    }
    
   
    const equipamento = await response.json();
    

    return equipamento;
}

export{GetEquipamentos,CreateEquipamento,UpdateEquipamento,GetEquipamentoById,GetEquipamentosAll}