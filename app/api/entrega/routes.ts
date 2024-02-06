import { baseUrl, takeBase } from "@/config/base";
import { EntregaCreateI, EntregaFilterData } from "@/interfaces/entras/interface";
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";



const CreateEntrega = async (usuario:UsuarioLogadoI,data:EntregaCreateI) => {
    const url = `${baseUrl}/entregra`;
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
    const entrega = await response.json() 
 
    return entrega ;
}

const GetEntregaById = async (usuario:UsuarioLogadoI,id:string)=>{
    const url = `${baseUrl}/entregra/${id}`;
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
    
   
    const entrega = await response.json();
    

    return entrega;
}

const GetEntregas = async (usuario:UsuarioLogadoI,skip:number,filter:string) => {

    const url = `${baseUrl}/entregra/findall/${takeBase}/skip/${skip}/${filter}`;	
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
    const entregas = await response.json() 
 
    return entregas ;
    
}

const GetEntregasPorPessoa = async (usuario:UsuarioLogadoI,pessoaId:string,skip:number,filter:string) => {

    const url = `${baseUrl}/entregra/findallforpessoas/${pessoaId}/take/${takeBase}/skip/${skip}/${filter}`;	
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
    const entregas = await response.json() 
 
    return entregas ;
    
}

const GetEntregaPorData = async (usuario:UsuarioLogadoI,data:any) => {
    console.log("skjdflskdj")
    const url = `${baseUrl}/entregra/entregarelatoriodate`;
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
    const entregas = await response.json() 
 
    return entregas ;
}




const ChangeStatusEntrega = async (usuarioLogado:UsuarioLogadoI,id:string) => {
    const url = `${baseUrl}/entregra/${id}`;

    const response = await fetch(url,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization' :`Bearer ${usuarioLogado.user.access_token}`
        },

     
    })

    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
    const usuario = await response.json()
 
    return usuario;
    
}
export {CreateEntrega,GetEntregaById,GetEntregas,GetEntregasPorPessoa,GetEntregaPorData,ChangeStatusEntrega}



