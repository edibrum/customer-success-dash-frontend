import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { TarefaDtoRequest, TarefaDtoResponse } from '../models/tarefas';
import { MetaDtoResponse } from '../models/metas';
import { PageResponse } from '../shared/utils/pagination';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {
  private readonly BASE_URL = environment.apiUrl;
  constructor(private http: HttpClient) {}

//TODO - generalizar(gerenteId: number) - por enquanto fixo como 1 ...
// buscarTarefasPorGerenteId(gerenteId: number): Observable<PageResponse<TarefaDtoResponse>> {
//       return this.http
//         .get<PageResponse<TarefaDtoResponse>>(
//           `${this.BASE_URL}/tarefas/filtrar?gerenteId=${gerenteId}`,
buscarTarefasPorGerenteId(): Observable<PageResponse<TarefaDtoResponse>> {
      return this.http
        .get<PageResponse<TarefaDtoResponse>>(
          `${this.BASE_URL}/tarefas/filtrar?gerenteId=${1}`,
          { observe: 'response' }
        )
        .pipe(
          tap((raw) => console.log('tarefas raw HttpResponse', raw)),
          map((raw) => {
            console.log('tarefas response body', raw.body);
            return raw.body as PageResponse<TarefaDtoResponse>;
          })
        );
}

//TODO - generalizar(gerenteId: number) - por enquanto fixo como 1 ...
// buscarTarefasComFiltros(gerenteId: number): Observable<PageResponse<TarefaDtoResponse>> {
buscarTarefasComFiltros(
    gerenteId: number,
    metaId: number | null,
    statusTarefa: string | null,
    tipoTarefa: string | null,
    inicio: string | null,
    fim: string | null,
    //pagination
    sortBy: string | null,
    page: number | null,
    size: number | null,
    direction: string | null
): Observable<PageResponse<TarefaDtoResponse>> {
      return this.http
        .get<PageResponse<TarefaDtoResponse>>(
          `${this.BASE_URL}/tarefas/filtrar??sortBy=${sortBy}&page=${page}&size=${size}&direction=${direction}&inicio=${inicio}&fim=${fim}&metaId=${metaId}&statusTarefa=${statusTarefa}&tipoTarefa=${tipoTarefa}&gerenteId=${gerenteId}`,
          { observe: 'response' }
        )
        .pipe(
          tap((raw) => console.log('tarefas raw HttpResponse', raw)),
          map((raw) => {
            console.log('tarefas response body', raw.body);
            return raw.body as PageResponse<TarefaDtoResponse>;
          })
        );
}

criarTarefa(dto: TarefaDtoRequest): Observable<TarefaDtoResponse> {
    return this.http.post<TarefaDtoResponse>(`${this.BASE_URL}/tarefas`, dto);
}

editarTarefa(dto: TarefaDtoRequest): Observable<TarefaDtoResponse> {
    return this.http.put<TarefaDtoResponse>(`${this.BASE_URL}/tarefas`, dto);
}

//TODO: criar serviço para metas
//META - somente BUSCAR PARA O GERENTE
buscarMeta(gerenteId: number): Observable<MetaDtoResponse> {
    return this.http.get<MetaDtoResponse>(`${this.BASE_URL}/metas/${gerenteId}`);
}

}
