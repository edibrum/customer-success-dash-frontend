import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
      let params = new HttpParams().set('gerenteId', String(gerenteId));
      if (sortBy != null) params = params.set('sortBy', String(sortBy));
      if (page != null) params = params.set('page', String(page));
      if (size != null) params = params.set('size', String(size));
      if (direction != null) params = params.set('direction', String(direction));
      if (inicio != null) params = params.set('inicio', String(inicio));
      if (fim != null) params = params.set('fim', String(fim));
      if (metaId != null) params = params.set('metaId', String(metaId));
      if (statusTarefa != null) params = params.set('statusTarefa', String(statusTarefa));
      if (tipoTarefa != null) params = params.set('tipoTarefa', String(tipoTarefa));

      return this.http
        .get<PageResponse<TarefaDtoResponse>>(`${this.BASE_URL}/tarefas/filtrar`, { params, observe: 'response' })
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
buscarMetasPorGerenteId(gerenteId: number): Observable<PageResponse<MetaDtoResponse>> {
    return this.http.get<PageResponse<MetaDtoResponse>>(`${this.BASE_URL}/metas/filtrar?gerenteId=${gerenteId}`);
}

}
