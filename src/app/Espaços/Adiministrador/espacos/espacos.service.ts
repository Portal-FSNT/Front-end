import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = environment.API;
@Injectable({
  providedIn: 'root'
})
export class EspacosService {
  private readonly API=`${API}espacos`;
  constructor(private http: HttpClient) { }

  listarEspacos(): Observable<any>{
    return this.http.get<any>(this.API)
  }
}
