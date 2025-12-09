import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioLogro } from '../models/usuarioLogro';

@Injectable({
  providedIn: 'root'
})

export class UsuarioLogroService {
  private apiUrl = 'http://localhost:8080/usuarios/logros';

  constructor(private http: HttpClient) { }

  getLogrosPorUsuario(idUsuario: number): Observable<UsuarioLogro[]> { 
    return this.http.get<UsuarioLogro[]>(`${this.apiUrl}/${idUsuario}`);
  }

  asignarLogroAUsuario(idUsuario: number, idLogro: number): Observable<UsuarioLogro> {
    const dto = { idUsuario, idLogro };
    return this.http.post<UsuarioLogro>(`${this.apiUrl}/asignar`, dto);
  }

  eliminarLogroDeUsuario(idUsuario: number, idLogro: number): Observable<void> {
    const dto = { idUsuario, idLogro };
    return this.http.request<void>('delete', `${this.apiUrl}/eliminar`, { body: dto });
  }

  tieneLogro(idUsuario: number, idLogro: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${idUsuario}/tiene/${idLogro}`);
  }
}
