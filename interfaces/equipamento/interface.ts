export interface EquipamentoI{
    id: string,
    nome: string,
    responsavel: string,
    sobre: string,
    observacao: string,
    cep: string,
    logradouro:string,
    complemento: string,
    bairro: string,
    localidade: string,
    numero: string,
    uf: string,
    status: string,

}

export interface EquipamentoCreateI{
    
    nome: string,
    responsavel: string,
    sobre: string,
    observacao: string,
    cep: string,
    logradouro:string,
    complemento?: string,
    bairro: string,
    localidade: string,
    numero: string,
    uf: string,


}