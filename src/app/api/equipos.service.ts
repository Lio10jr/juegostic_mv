import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {
  private apiUrl: string = environment.apiUrl;


  constructor(private _http: HttpClient) { }

  getEquipoCampeonato(fk_idcamp: string) {
    return this._http.get(this.apiUrl + 'equiposCamp/' + fk_idcamp);
  }
}
