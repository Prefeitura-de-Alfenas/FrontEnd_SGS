import { EquipamentoI } from "../equipamento/interface";

export  interface UsuarioI{
    id: string,
    nome: string,
    email: string,
    senha: string,
    telefone: string,
    status: string,
    createdAt: string,
    updatedAt: string,
    equipamento:EquipamentoI
}


export  interface UsuarioCreateI{
    nome: string,
    email: string,
    senha: string,
    telefone?: string,
}


export  interface PermissaoI{
    id: string,
    nome: string,
    createdAt: string,
    updatedAt: string,
}


export interface PermissionChangeProps{
    userId:string;
    permissionId:string;
    usuario:UsuarioLogadoI;
}

export interface UsuarioLogadoI{
    email:string;
    user:{
        id:string,
        email:string,
        nome:string,
        role:string[],
        access_token:string
    };
    iat:string;
    exp:string;
    jti:string;
}
