import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CadEventos } from './cad-eventos';
import { TokenService } from 'src/app/authentication/token.service';
import { Observable, switchMap, take } from 'rxjs';
import { UserService } from 'src/app/authentication/user/user.service';

const API = environment.API;

@Injectable({
  providedIn: 'root'
})

export class CadEventosService {
  private readonly API_BuscarLugares = `${API}espacos`;

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  private getHeader(): HttpHeaders {
    const token = this.tokenService.returnToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  create(novoCampo: CadEventos): Observable<any> {
    const header = this.getHeader();
    const params = { ...novoCampo }; 

    return this.http.post<any>(`${API}eventos/create`, params, { headers: header });
  }

  listarLugares(): Observable<any> {
    return this.http.get(this.API_BuscarLugares);
  }

}
