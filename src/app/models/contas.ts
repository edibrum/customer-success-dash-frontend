import { ClienteDtoResponse } from "./cliente";
import { GerenteDtoResponse } from "./gerentes";

export interface ContaDtoResponse {
  id: number;
  ativo: boolean;
  dataCriacao: string;
  dataAtualizacao: string;
  banco: string;
  agencia: string;
  numero: string;
  digito: string;
  saldo: string;
  titular: ClienteDtoResponse;
  gerente: GerenteDtoResponse;
  tipo: EnumTipoConta;
}

export interface ContaDtoRequest {
  id: number;
  ativo: boolean;
  banco: string;
  agencia: string;
  numero: string;
  digito: string;
  saldo: string;
  titularId: number;
  gerenteId: number;
  tipo: EnumTipoConta;
}

export type EnumTipoConta = 'CORRENTE' | 'POUPANCA' | 'SALARIO';