import { BeneficioOnPessoasI } from "../pessoa/interface";


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

export interface BeneficiosEntregaI{
    id: string,
    nome: string,
    descricao: string,
    categoria: string,
    valor: number,
    status?:string,
    pessoas:BeneficioOnPessoasI[],
    beneficio:BeneficiosI
}