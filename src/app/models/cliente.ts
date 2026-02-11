import { PfDtoResponse, PfDtoRequest } from './pessoaFisica';
import { PjDtoResponse, PjDtoRequest } from './pessoaJuridica';

export interface ClienteDtoResponse {
  id: number;
  ativo: boolean;
  dataCriacao: string;
  dataAtualizacao: string;
  pessoa: PfDtoResponse | PjDtoResponse;
}

export interface ClienteDtoRequest {
  id: number;
  ativo: boolean;
  dataCriacao: string;
  dataAtualizacao: string;
  pessoa: PfDtoRequest | PjDtoRequest;
}