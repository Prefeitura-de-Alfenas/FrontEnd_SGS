import { BeneficiosI } from "../beneficios/inteface"
import { EquipamentoI } from "../equipamento/interface"
import { PessoaI } from "../pessoa/interface"
import { UsuarioI } from "../usuario/interface"



export interface EntregaI{
    id: string,
    quantidade: number,
    observacao: string,
    datacadastro:Date,
    pessoId: string,
    equipamentoId: string,
    usuarioId:string,
    beneficioId:string
    pessoa:PessoaI,
    beneficio:BeneficiosI,

}

 export interface EntregaCreateI{

    quantidade: number,
    observacao: string,
    pessoId: string,
    equipamentoId: string,
    usuarioId:string,
    beneficioId:string


}

export interface EntregaByIdI{
    id:string,
    quantidade: number,
    observacao: string,
    datacadastro:Date,
    status:string,
    pessoId: string,
    equipamentoId: string,
    usuarioId:string,
    beneficioId:string,
    pessoa:PessoaI,
    beneficio:BeneficiosI,
    equipamento:EquipamentoI,
    usuario:UsuarioI,



}

