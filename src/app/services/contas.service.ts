import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { ContaDtoResponse } from '../models/contas';
import { PageResponse } from '../shared/utils/pagination';

@Injectable({
  providedIn: 'root'
})
export class ContasService {
  private readonly BASE_URL = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getContasPorGerenteId(gerenteId: number): Observable<PageResponse<ContaDtoResponse>> {
    return this.http
      .get<PageResponse<ContaDtoResponse>>(
        `${this.BASE_URL}/contas/filtrar?gerenteId=${gerenteId}`,
        { observe: 'response' }
      )
      .pipe(
        tap((raw) => console.log('contas raw HttpResponse', raw)),
        map((raw) => {
          console.log('contas response body', raw.body);
          return raw.body as PageResponse<ContaDtoResponse>;
        })
      );
  }

//o valores de filtro pro backend podem ser null, mas vamos manter o gerenteId como OBRIGATÓRIO aqui neste caso
  getContasGerente(
    sortBy: string | null,
    page: number | null,
    size: number | null,
    direction: string | null,
    inicio: string | null,
    fim: string | null,
    tipoPessoa: string | null,
    tipoConta: string | null,
    gerenteId: number
  ): Observable<ContaDtoResponse[]> {
    return this.http.get<ContaDtoResponse[]>(`${this.BASE_URL}/contas/filtrar?sortBy=${sortBy}&page=${page}&size=${size}&direction=${direction}&inicio=${inicio}&fim=${fim}&tipoPessoa=${tipoPessoa}&tipoConta=${tipoConta}&gerenteId=${gerenteId}`);
  }

}
