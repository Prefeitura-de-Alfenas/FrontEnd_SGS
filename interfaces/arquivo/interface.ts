import { PessoaI } from "../pessoa/interface";

export interface Arquivo{

    id: string,
    nome: string,
    url: string,
    pessoId: string,
    pessoa: PessoaI

}

export interface ArquivoCreateI{

    file?: File,
    nome: string,
    pessoId: string,

}

