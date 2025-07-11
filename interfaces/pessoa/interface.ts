export interface PessoaI {
  id: string;
  nome: string;
  cpf: string;
  sexo: string;
  telefone: string;
  email: string;
  datanascimento: Date;
  rg: string;
  parentesco: string;
  escolaridade: string;
  estadocivil: string;
  renda: number;
  ctpsassinada: number;
  ppcl: number;
  observacao: string;
  observacaorestrita: string;
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  numero: string;
  uf: string;
  status?: string;
  motivoexclusao?: string;
  usuario: {
    nome: string;
  };
  slug?:string;
}

export interface PessoaCreateI {
  nome: string;
  cpf: string;
  sexo: string;
  telefone?: string;
  email?: string;
  datanascimento: Date;
  rg?: string;
  parentesco?: string;
  escolaridade: string;
  estadocivil: string;
  renda: number;
  ctpsassinada: number;
  ppcl: number;
  observacao?: string;
  observacaorestrita?: string;
  cep: string;
  logradouro: string;
  complemento?: string;
  bairro: string;
  localidade: string;
  numero: string;
  uf: string;
  usuarioId: string;
}

export interface BeneficioOnPessoasI {
  pessoaId: string;
  beneficioId: string;
}
