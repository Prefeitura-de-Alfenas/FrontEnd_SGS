import { baseUrl, takeBase } from "@/config/base";
import { PessoaCreateI } from "@/interfaces/pessoa/interface";
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";




const GetPessasInativa = async (usuario:UsuarioLogadoI,skip:number,filter:string) => {
    
    const url = `${baseUrl}/pessoa/findallinative/${takeBase}/skip/${skip}/${filter}`;	
    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization' :`Bearer ${usuario.user.access_token}`
        },
    })
    if(response.statusText === "Unauthorized") {
      
        throw new Error("Conexão com a rede está com problema")
    }

    if(!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
    const pessoas = await response.json() 
 
    return pessoas ;
    
}
const GetPessasPrData = async (usuario:UsuarioLogadoI,datainical:string,datafinal:string,filter:string) => {

    const url = `${baseUrl}/pessoa/datauserfind/${datainical}/datefinal/${datafinal}/${filter}`;	
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
    const pessoas = await response.json() 
 
    return pessoas ;
    
}
const GetPessas = async (usuario:UsuarioLogadoI,skip:number,filter:string) => {

    const url = `${baseUrl}/pessoa/${takeBase}/skip/${skip}/${filter}`;	
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
    const pessoas = await response.json() 
 
    return pessoas ;
    
}

const CreatePessoa = async (usuario:UsuarioLogadoI,data:PessoaCreateI) => {
    const url = `${baseUrl}/pessoa`;
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
    const pessoa = await response.json() 
 
    return pessoa ;
}

const UpdatePessoa = async (usuario:UsuarioLogadoI,id:string,data:PessoaCreateI) => {
    const url = `${baseUrl}/pessoa/${id}`;
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
    const pessoa = await response.json() 
 
    return pessoa ;
}

const GetPessoaById = async (usuario:UsuarioLogadoI,id:string)=>{
    const url = `${baseUrl}/pessoa/${id}`;
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
    
 
   
    const pessoa = await response.json();
    

    return pessoa;
}

const GetPessoaEntregaById = async (usuario:UsuarioLogadoI,id:string)=>{
    const url = `${baseUrl}/pessoa/entrega/${id}`;
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
    
 
   
    const pessoa = await response.json();
    

    return pessoa;
}


const GetCepViaCep = async (usuario:UsuarioLogadoI,cep:string)=>{
    console.log('cep',cep)
    const url = `https://viacep.com.br/ws/${cep}/json/`;
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
    
    const dadoscpe = await response.json();

    return dadoscpe;
}

const ChangeBeneficioPessoa = async(usuario:UsuarioLogadoI,beneficioId:string,pessoaId:string)=>{
    const url = `${baseUrl}/beneficio/${beneficioId}/pessoa/${pessoaId}`;
    const response = await fetch(url,{
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            'Authorization' :`Bearer ${usuario.user.access_token}`
        }
    })

    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
    const pessoa = await response.json() 
 
    return pessoa ;
}


const ChangeStatus = async(usuario:UsuarioLogadoI,id:string)=>{
    const url = `${baseUrl}/pessoa/changestatus/${id}`;
    const response = await fetch(url,{
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            'Authorization' :`Bearer ${usuario.user.access_token}`
        }
    })

    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
    const pessoa = await response.json() 
 
    return pessoa ;
}
export {GetPessas,CreatePessoa,GetPessoaById,GetCepViaCep,UpdatePessoa,ChangeBeneficioPessoa,ChangeStatus,GetPessasInativa,GetPessoaEntregaById,GetPessasPrData}