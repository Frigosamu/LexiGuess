import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Logro } from '../models/logro';

@Injectable({
  providedIn: 'root'
})

export class LogroService {
  private apiUrl = 'http://localhost:8080/logros';

  constructor(private http: HttpClient) { }

  getLogros(): Observable<Logro[]> {
    return this.http.get<Logro[]>(this.apiUrl);
  }

  getLogroById(id: number): Observable<Logro> {
    return this.http.get<Logro>(`${this.apiUrl}/${id}`);
  }

  createLogro(logro: Logro): Observable<Logro> {
    return this.http.post<Logro>(this.apiUrl, logro);
  }

  updateLogro(id: number, logro: Logro): Observable<Logro> {
    return this.http.put<Logro>(`${this.apiUrl}/${id}`, logro);
  }

  deleteLogro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
