import { baseUrl, takeBase } from "@/config/base";
import { EquipamentoCreateI } from "@/interfaces/equipamento/interface";
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";

const GetEquipamentos = async (usuario:UsuarioLogadoI,skip:number,filter:string) => {

    const url = `${baseUrl}/equipamento/findall/${takeBase}/skip/${skip}/${filter}`;	
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
    const equipamentos = await response.json() 
 
    return equipamentos ;
    
}
const GetEquipamentosAll = async (usuario:UsuarioLogadoI) => {

    const url = `${baseUrl}/equipamento`;	
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
    const equipamentos = await response.json() 
 
    return equipamentos ;
    
}

const CreateEquipamento = async (usuario:UsuarioLogadoI,data:EquipamentoCreateI) => {
    const url = `${baseUrl}/equipamento`;
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
    const equipamento = await response.json() 
 
    return equipamento ;
}

const UpdateEquipamento = async (usuario:UsuarioLogadoI,id:string,data:EquipamentoCreateI) => {
    const url = `${baseUrl}/equipamento/${id}`;
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
    const equipamento = await response.json() 
 
    return equipamento ;
}

const GetEquipamentoById = async (usuario:UsuarioLogadoI,id:string)=>{
    const url = `${baseUrl}/equipamento/${id}`;
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
    
   
    const equipamento = await response.json();
    

    return equipamento;
}

export{GetEquipamentos,CreateEquipamento,UpdateEquipamento,GetEquipamentoById,GetEquipamentosAll}