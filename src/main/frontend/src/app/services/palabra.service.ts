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

}
