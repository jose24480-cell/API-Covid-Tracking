import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  // Dirección de nuestra API de C#
  private apiUrl = 'http://localhost:5108/api/covid';

  constructor(private http: HttpClient) {}

  // Obtener los datos de COVID
  obtenerDatos() {
    return this.http.get<any[]>(this.apiUrl);
  }
}