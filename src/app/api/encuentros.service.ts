import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EncuentrosService {
  private apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  getAllViewEncuentrosByCamp(fk_idcamp: string) {
    return this._http.get(this.apiUrl + 'viewencuentrosCamp/' + fk_idcamp);
  }
}
