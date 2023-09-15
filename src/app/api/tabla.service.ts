import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TablaService {
  private apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  getPosicionesByCampView(id_campeonato:string) {
    return this._http.get(this.apiUrl + 'tabla_posicionesView/' + id_campeonato);
  }
}
