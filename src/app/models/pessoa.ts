import {EnderecoDtoResponse, EnderecoDtoRequest} from './endereco';

export interface PessoaDtoResponse {
  tipoPessoa: EnumTipoPessoa;
  id: number;
  nome: string;
  email: string;
  telefone: string;
  ativo: boolean;
  endereco: EnderecoDtoResponse;
}

export interface PessoaDtoRequest {
  tipoPessoa: EnumTipoPessoa;
  id?: number;
  nome: string;
  email: string;
  telefone: string;
  ativo: boolean;
  endereco: EnderecoDtoRequest;
}

type EnumTipoPessoa = 'PF' | 'PJ';