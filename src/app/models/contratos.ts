import { ContaDtoResponse } from "./contas";
import { ProdutoDtoResponse } from "./produtos";
import { PageResponse } from '../shared/utils/pagination';

export interface ContratoDtoResponse {
  id: number;
  ativo: boolean;
  dataCriacao: string;
  dataAtualizacao: string;
  vigenciaInicio: string;
  vigenciaFim: string;
  observacao: string;
  conta: ContaDtoResponse;
  produto: ProdutoDtoResponse;
}

export interface ContratoDtoRequest {
  id?: number;
  ativo: boolean;
  vigenciaInicio: string;
  vigenciaFim: string;
  observacao: string;
  contaId: number;
  produtoId: number;
}

export interface ResumoPorProdutosDtoResponse {
  produtoCodigo: string;
  produtoDescricao: string;
  contratosVigentes: PageResponse<ContratoDtoResponse>;
  contasGapDoProduto: PageResponse<ContaDtoResponse>;
}