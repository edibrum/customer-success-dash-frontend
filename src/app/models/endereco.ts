export interface EnderecoDtoResponse {
  id: number;
  ativo: boolean;
  bairro: string;
  cep: string;
  cidade: string;
  complemento: string | null;
  logradouro: string;
  numero: string;
  observacao: string | null;
  pais: string;
  uf: string;
}

export interface EnderecoDtoRequest {
  id: number;
  ativo: boolean;
  bairro: string;
  cep: string;
  cidade: string;
  complemento: string | null;
  logradouro: string;
  numero: string;
  observacao: string | null;
  pais: string;
  uf: string;
}