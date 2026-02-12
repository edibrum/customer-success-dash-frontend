import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { ContratoDtoResponse } from '../models/contratos';
import { PageResponse } from '../shared/utils/pagination';

@Injectable({
  providedIn: 'root'
})
export class ContratosService {
  private readonly BASE_URL = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getContratosPorGerenteId(gerenteId: number): Observable<PageResponse<ContratoDtoResponse>> {
    return this.http
      .get<PageResponse<ContratoDtoResponse>>(
        `${this.BASE_URL}/contratos/filtrar?gerenteId=${gerenteId}`,
        { observe: 'response' }
      )
      .pipe(
        tap((raw) => console.log('contratos raw HttpResponse', raw)),
        map((raw) => {
          console.log('contratos response body', raw.body);
          return raw.body as PageResponse<ContratoDtoResponse>;
        })
      );
  }

  getContratosPIXPorGerenteId(gerenteId: number): Observable<PageResponse<ContratoDtoResponse>> {
    return this.http
      .get<PageResponse<ContratoDtoResponse>>(
        `${this.BASE_URL}/contratos/filtrar?gerenteId=${gerenteId}&produtoId=${1}`,
        { observe: 'response' }
      )
      .pipe(
        tap((raw) => console.log('contratos raw HttpResponse', raw)),
        map((raw) => {
          console.log('contratos response body', raw.body);
          return raw.body as PageResponse<ContratoDtoResponse>;
        })
      );
  }

  getContratosCREDITOPorGerenteId(gerenteId: number): Observable<PageResponse<ContratoDtoResponse>> {
    return this.http
      .get<PageResponse<ContratoDtoResponse>>(
        `${this.BASE_URL}/contratos/filtrar?gerenteId=${gerenteId}&produtoId=${2}`,
        { observe: 'response' }
      )
      .pipe(
        tap((raw) => console.log('contratos raw HttpResponse', raw)),
        map((raw) => {
          console.log('contratos response body', raw.body);
          return raw.body as PageResponse<ContratoDtoResponse>;
        })
      );
  }
//o valores de filtro pro backend podem ser null, mas vamos manter o gerenteId como OBRIGATÓRIO aqui neste caso
  getContratosGerente(
    sortBy: string | null,
    page: number | null,
    size: number | null,
    direction: string | null,
    inicio: string | null,
    fim: string | null,
    tipoPessoa: string | null,
    tipoConta: string | null,
    produtoId: number | null,
    gerenteId: number
  ): Observable<ContratoDtoResponse[]> {
    return this.http.get<ContratoDtoResponse[]>(`${this.BASE_URL}/contratos/filtrar?sortBy=${sortBy}&page=${page}&size=${size}&direction=${direction}&inicio=${inicio}&fim=${fim}&tipoPessoa=${tipoPessoa}&tipoContrato=${tipoConta}&produtoId=${produtoId}&gerenteId=${gerenteId}`);
  }

}
