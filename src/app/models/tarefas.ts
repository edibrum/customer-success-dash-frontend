import { GerenteDtoResponse } from "./gerentes";

export interface TarefaDtoResponse {
  id: number;
  ativo: boolean;
  dataCriacao: string;
  dataAtualizacao: string;
  status: EnumStatusTarefa;
  tipo: EnumTipoTarefa;
  descricao: string;
  observacao?: string;
  gerente: GerenteDtoResponse;
  metaId?: number;
  clienteId?: number;
  contratoId?: number;
  produtoId?: number;
}

export interface TarefaDtoRequest {
  id?: number;
  ativo: boolean;
  status: EnumStatusTarefa;
  tipo: EnumTipoTarefa;
  descricao: string;
  observacao?: string;
  gerenteId: number;
  metaId?: number;
  clienteId?: number;
  contratoId?: number;
  produtoId?: number;
}

export type EnumStatusTarefa = 'CRIADA' | 'EM_ANDAMENTO' | 'REALIZADA,' | 'OSTERGADA' | 'CANCELADA';

export type EnumTipoTarefa = 'VISITA_LOCAL' | 'CONTATO_TELEFONICO' | 'COBRANCA' | 'OUTRO';