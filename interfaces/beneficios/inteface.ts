import { BeneficioOnPessoasI, PessoaI } from "../pessoa/interface";


export interface BeneficiosI{
    id: string,
    nome: string,
    descricao: string,
    categoria: string,
    valor: number,
    status?:string,
    pessoas:BeneficioOnPessoasI[]
}

export interface BeneficiosCreateI{

    nome: string,
    descricao: string,
    categoria: string,
    valor: number,


}