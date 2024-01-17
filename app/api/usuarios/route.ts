import { baseUrl } from "@/config/base"
import { PermissionChangeProps, UsuarioCreateI, UsuarioLogadoI } from "@/interfaces/usuario/interface";



const GetUsuarios = async (usuarioLogado:UsuarioLogadoI) => {
    const url = `${baseUrl}/usuario`;
    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization' :`Bearer ${usuarioLogado.user.access_token}`
        },
    })

    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
    const usuarios = await response.json() 
 
    return usuarios ;
    
}

const ChangeStatusUsuarios = async (usuarioLogado:UsuarioLogadoI,id:string) => {
    const url = `${baseUrl}/usuario/${id}`;

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

const CreateUsuario = async (usuarioLogado:UsuarioLogadoI,data:UsuarioCreateI) => {
    const url = `${baseUrl}/usuario`;
    const response = await fetch(url,{
        method: 'Post',
        headers: {
            'Content-type': 'application/json',
            'Authorization' :`Bearer ${usuarioLogado.user.access_token}`
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
    const usuario = await response.json()

    return usuario;
}

const UpUsuario = async (usuarioLogado:UsuarioLogadoI,id:string,data:UsuarioCreateI) => {
    const url = `${baseUrl}/usuario/update/${id}`;
    const response = await fetch(url,{
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            'Authorization' :`Bearer ${usuarioLogado.user.access_token}`
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
    const usuario = await response.json()

    return usuario;
}

const GetUsuarioById = async (usuarioLogado:UsuarioLogadoI,id:string)=>{
    const url = `${baseUrl}/usuario/${id}`;
    const response = await fetch(url,{
        method:'GET',
        headers:{
            'Content-type': 'application/json',
            'Authorization' :`Bearer ${usuarioLogado.user.access_token}`
        }
    })

    if(!response.ok) {
        throw new Error("Conexão com a rede está com problemaas");
    }
    
    const usuario = await response.json();

    return usuario;
}

const GetPersmisoes = async(usuarioLogado:UsuarioLogadoI,)=>{
   const url = `${baseUrl}/usuario/findpermissaouser`
   
   const response = await fetch(url,{
     method:'GET',
     headers:{
        'content-type': 'application/json',
        'Authorization' :`Bearer ${usuarioLogado.user.access_token}`
     }
   })

   if(!response.ok) {
    throw new Error("Conexão com a rede está com problemas");
   }
   const persmisoes = await response.json();
   return persmisoes;

}

const GetUsuerPermission = async(usuarioLogado:UsuarioLogadoI,id:string)=>{
    const url = `${baseUrl}/usuario/findpermissaouser/${id}`
    
    const response = await fetch(url,{
      method:'GET',
      headers:{
         'content-type': 'application/json',
         'Authorization' :`Bearer ${usuarioLogado.user.access_token}`
      }
    })
 
    if(!response.ok) {
     throw new Error("Conexão com a rede está com problemas");
    }
    const usuarioPermissoes = await response.json();

    return usuarioPermissoes;
 
}

const PermissionChange = async(data:PermissionChangeProps) =>{
    const url = `${baseUrl}/usuario/permissachange`

    const response = await fetch(url,{
      method:'PATCH',
      headers:{
         'content-type': 'application/json',
         'Authorization' :`Bearer ${data.usuario.user.access_token}`
      },
      body: JSON.stringify(data)
    })
 
    if(!response.ok) {
     throw new Error("Conexão com a rede está com problemas");
    }

    
    const usuario = await response.json()


    return usuario;
}

export  {GetUsuarios,ChangeStatusUsuarios ,CreateUsuario,GetUsuarioById,UpUsuario,GetPersmisoes,GetUsuerPermission,PermissionChange}

