import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  getAllPlayersEquipo(fk_idequ: string) {
    return this._http.get(this.apiUrl + 'players/' + fk_idequ);
  }
}
