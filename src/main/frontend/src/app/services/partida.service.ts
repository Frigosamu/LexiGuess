import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partida } from '../models/partida';

@Injectable({
  providedIn: 'root'
})
export class PartidaService {
  private apiUrl = 'http://localhost:8080/partidas';

  constructor(private http: HttpClient) { }

  getPartidas(): Observable<Partida[]> {
    return this.http.get<Partida[]>(this.apiUrl);
  }

  getPartidasPorId(id: number): Observable<Partida> {
    return this.http.get<Partida>(`${this.apiUrl}/${id}`);
  }

  getPartidasPorUsuario(usuarioId: number): Observable<Partida[]> {
    return this.http.get<Partida[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  createPartida(partida: Partida): Observable<Partida> {
    return this.http.post<Partida>(this.apiUrl, partida);
  }

  updatePartida(id: number, partida: Partida): Observable<Partida> {
    return this.http.put<Partida>(`${this.apiUrl}/${id}`, partida);
  }

  updateIntentos(id: number, intentos: number) {
    return this.http.patch<Partida>(`${this.apiUrl}/${id}/intentos`, { intentos });
  }

  deletePartida(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getRanking(): Observable<{ usuario: { nombre: string }, puntuacionTotal: number }[]> {
    return this.http.get<{ usuario: { nombre: string }, puntuacionTotal: number }[]>(`${this.apiUrl}/ranking`);
  }

}
