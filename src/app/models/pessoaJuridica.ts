import { PessoaDtoResponse, PessoaDtoRequest } from './pessoa';

export interface PjDtoResponse extends PessoaDtoResponse {
  tipoPessoa: 'PJ';
  cnpj: string;
  nomeFantasia: string;
  inscEstadual: string;
  inscMunicipal: string;
  abertura: string;
  tipoEmpresa: EnumTipoEmpresa;
}

export interface PjDtoRequest extends PessoaDtoRequest {
  tipoPessoa: 'PJ';
  cnpj: string;
  nomeFantasia: string;
  inscEstadual: string;
  inscMunicipal: string;
  abertura: string;
  tipoEmpresa: EnumTipoEmpresa;
}

export type EnumTipoEmpresa = string;