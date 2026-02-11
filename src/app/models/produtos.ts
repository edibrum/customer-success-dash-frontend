export interface ProdutoDtoResponse {
  id: number;
  ativo: boolean;
  dataCriacao: string;
  dataAtualizacao: string;
  codigo: string;
  descricao: string;
  observacao: string;
}

export interface ProdutoDtoRequest {
  id?: number;
  ativo: boolean;
  codigo: string;
  descricao: string;
  observacao: string;
}