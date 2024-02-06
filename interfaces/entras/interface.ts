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
    status:string,

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

export interface EntregaFilterData{

    dateinicial:string,


    datefinal:string,

    usuarioId?: string,

 
    equipamentoId?: string,


    pessoId?: string,

  
    beneficioId?: string,
}


export interface RelatorioEntregaFilterData{
  id:string,
  pessoa:PessoaI,
  cpf:string,
  beneficio:BeneficiosI,
  quantidade:number,
  observacao:string,
  equipamento:EquipamentoI,
  usuario:UsuarioI,
  datacadastro:string,
  status:string,
}

