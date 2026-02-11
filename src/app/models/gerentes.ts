import { PfDtoResponse, PfDtoRequest } from './pessoaFisica';
import { PjDtoResponse, PjDtoRequest } from './pessoaJuridica';

export interface GerenteDtoResponse {
  id: number;
  ativo: boolean;
  dataCriacao: string;
  dataAtualizacao: string;
  admissao: string;
  pessoa: PfDtoResponse | PjDtoResponse;
}

export interface GerenteDtoRequest {
  id: number;
  ativo: boolean;
  admissao: string;
  pessoa: PfDtoRequest | PjDtoRequest;
}