import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from '../../authentication/token.service';

const API = environment.API;
@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private readonly  API = `${API}eventos`;
  constructor(private http: HttpClient) { }

  listarEvento():Observable<any>{
    return this.http.get<any>(this.API)
  }
}