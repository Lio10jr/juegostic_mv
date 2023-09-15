import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CampeonatosService {
  apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private _http: HttpClient) { }

  getAllCampeonato() {
    return this._http.get(this.apiUrl + 'campeonatos');
  }
}
