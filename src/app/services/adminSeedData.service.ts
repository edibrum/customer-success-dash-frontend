import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminSeedDataService {
  private readonly BASE_URL = environment.apiUrl;
  constructor(private http: HttpClient) {}

  postSeedDataRequest(): Observable<string> {
    return this.http.post(`${this.BASE_URL}/admin/seed-database`, {}, { responseType: 'text' });
  }

}
