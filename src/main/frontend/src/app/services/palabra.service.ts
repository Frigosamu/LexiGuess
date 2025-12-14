import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Palabra } from '../models/palabra';

@Injectable({
  providedIn: 'root'
})
export class PalabraService {
  private apiUrl = 'http://localhost:8080/palabras';

  constructor(private http: HttpClient) { }

  getPalabras(): Observable<Palabra[]> {
    return this.http.get<Palabra[]>(this.apiUrl);
  }
  
  getPalabraAleatoria(): Observable<Palabra> {
    return this.http.get<Palabra>(`${this.apiUrl}/random`);
  }

  palabraExists(palabra: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/exists/${palabra}`);
  }

  createPalabra(palabra: Palabra): Observable<Palabra> {
    return this.http.post<Palabra>(this.apiUrl, palabra);
  }

  deletePalabra(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  editarPalabra(id: number, palabra: Palabra): Observable<Palabra> {
    return this.http.put<Palabra>(`${this.apiUrl}/${id}`, palabra);
  }
}
