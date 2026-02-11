import { PessoaDtoResponse, PessoaDtoRequest } from './pessoa';

export interface PfDtoResponse extends PessoaDtoResponse {
  tipoPessoa: 'PF';
  cpf: string;
  rg: string;
  nascimento: string;
  sexo: string;
  nomeSocial?: string;
  artigoPreferencia?: string;
}

export interface PfDtoRequest extends PessoaDtoRequest  {
  tipoPessoa: 'PF';
  cpf: string;
  rg: string;
  nascimento: string;
  sexo: string;
  nomeSocial?: string;
  artigoPreferencia?: string;
}