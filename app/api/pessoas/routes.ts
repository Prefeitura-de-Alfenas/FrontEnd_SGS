import { baseUrl } from "@/config/base";
import { PessoaCreateI } from "@/interfaces/pessoa/interface";

const GetPessasInativa = async (skip:number,filter:string) => {

    const url = `${baseUrl}/pessoa/findallinative/2/skip/${skip}/${filter}`;	
    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
    })

    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
    const pessoas = await response.json() 
 
    return pessoas ;
    
}
const GetPessas = async (skip:number,filter:string) => {

    const url = `${baseUrl}/pessoa/2/skip/${skip}/${filter}`;	
    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
    })

    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
    const pessoas = await response.json() 
 
    return pessoas ;
    
}

const CreatePessoa = async (data:PessoaCreateI) => {
    const url = `${baseUrl}/pessoa`;
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
    const pessoa = await response.json() 
 
    return pessoa ;
}

const UpdatePessoa = async (id:string,data:PessoaCreateI) => {
    const url = `${baseUrl}/pessoa/${id}`;
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
    const pessoa = await response.json() 
 
    return pessoa ;
}

const GetPessoaById = async (id:string)=>{
    const url = `${baseUrl}/pessoa/${id}`;
    const response = await fetch(url,{
        method:'GET',
        headers:{
            'Content-type': 'application/json'
        }
    })

    if(!response.ok) {
        throw new Error("Conexão com a rede está com problemaas");
    }
    
   
    const pessoa = await response.json();
    

    return pessoa;
}

const GetCepViaCep = async (cep:string)=>{
    console.log('cep',cep)
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await fetch(url,{
        method:'GET',
        headers:{
            'Content-type': 'application/json'
        }
    })

    if(!response.ok) {
        throw new Error("Conexão com a rede está com problemaas");
    }
    
    const dadoscpe = await response.json();

    return dadoscpe;
}

const ChangeBeneficioPessoa = async(beneficioId:string,pessoaId:string)=>{
    const url = `${baseUrl}/beneficio/${beneficioId}/pessoa/${pessoaId}`;
    const response = await fetch(url,{
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        }
    })

    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
    const pessoa = await response.json() 
 
    return pessoa ;
}


const ChangeStatus = async(id:string)=>{
    const url = `${baseUrl}/pessoa/changestatus/${id}`;
    const response = await fetch(url,{
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        }
    })

    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
    const pessoa = await response.json() 
 
    return pessoa ;
}
export {GetPessas,CreatePessoa,GetPessoaById,GetCepViaCep,UpdatePessoa,ChangeBeneficioPessoa,ChangeStatus,GetPessasInativa}