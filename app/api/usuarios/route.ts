import { baseUrl } from "@/config/base"
import { PermissionChangeProps, UsuarioCreateI } from "@/interfaces/usuario/interface";



const GetUsuarios = async () => {
    const url = `${baseUrl}/usuario`;
    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
    })

    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
    const usuarios = await response.json() 
 
    return usuarios ;
    
}

const ChangeStatusUsuarios = async (id:string) => {
    const url = `${baseUrl}/usuario/${id}`;

    const response = await fetch(url,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json', // Adicione este cabeçalho se necessário
        },

     
    })

    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
    const usuario = await response.json()
 
    return usuario;
    
}

const CreateUsuario = async (data:UsuarioCreateI) => {
    const url = `${baseUrl}/usuario`;
    const response = await fetch(url,{
        method: 'Post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
    const usuario = await response.json()

    return usuario;
}

const UpUsuario = async (id:string,data:UsuarioCreateI) => {
    const url = `${baseUrl}/usuario/update/${id}`;
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
    const usuario = await response.json()

    return usuario;
}

const GetUsuarioById = async (id:string)=>{
    const url = `${baseUrl}/usuario/${id}`;
    const response = await fetch(url,{
        method:'GET',
        headers:{
            'Content-type': 'application/json'
        }
    })

    if(!response.ok) {
        throw new Error("Conexão com a rede está com problemaas");
    }
    
    const usuario = await response.json();

    return usuario;
}

const GetPersmisoes = async()=>{
   const url = `${baseUrl}/usuario/findpermissaouser`
   
   const response = await fetch(url,{
     method:'GET',
     headers:{
        'content-type': 'application/json'
     }
   })

   if(!response.ok) {
    throw new Error("Conexão com a rede está com problemas");
   }
   const persmisoes = await response.json();
   return persmisoes;

}

const GetUsuerPermission = async(id:string)=>{
    const url = `${baseUrl}/usuario/findpermissaouser/${id}`
    
    const response = await fetch(url,{
      method:'GET',
      headers:{
         'content-type': 'application/json'
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
         'content-type': 'application/json'
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

