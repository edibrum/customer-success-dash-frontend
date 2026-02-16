import { GerenteDtoResponse } from "./gerentes";
import { ProdutoDtoResponse } from "./produtos";

export interface MetaDtoResponse {
  id: number;
  ativo: boolean;
  inicio: string;
  fim: string;
  status: EnumStatusMeta;
  gerente: GerenteDtoResponse;
  produto: ProdutoDtoResponse;
  descricao: string;
  observacao: string;
}

export interface MetaDtoRequest {
  id?: number;
  ativo: boolean;
  inicio: string;
  fim: string;
  status: EnumStatusMeta;
  gerenteId: number;
  produtoId: number;
  descricao: string;
  observacao: string;
}

export type EnumStatusMeta = 'ESTIPULADA' | 'CONFIRMADA' | 'ANDAMENTO' | 'ATINGIDA' | 'CANCELADA' | 'VENCIDA';