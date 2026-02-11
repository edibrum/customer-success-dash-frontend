import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ClienteDtoResponse } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private readonly BASE_URL = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getClientes(): Observable<ClienteDtoResponse[]> {
    return this.http.get<ClienteDtoResponse[]>(`${this.BASE_URL}/clientes`);
  }

  getClienteById(id: number | string): Observable<ClienteDtoResponse> {
    return this.http.get<ClienteDtoResponse>(`${this.BASE_URL}/clientes/${id}`);
  }
}
