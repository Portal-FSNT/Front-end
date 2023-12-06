import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Espaco } from './espaco';
import { TokenService } from 'src/app/authentication/token.service';

const API = environment.API;

@Injectable({
    providedIn: 'root'
})

export class EspacosNovoService {
    private readonly API=`${API}espacos/create`;
    private readonly API_BuscarInsituicoes = `${API}instituicoes`;


    constructor(private http: HttpClient, private tokenService: TokenService) { }

    private getHeader(): HttpHeaders {
      const token = this.tokenService.returnToken();
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
  
    create(novoCampo: Espaco): Observable<any> {
      const header = this.getHeader();
      const params = { ...novoCampo }; 
  
      return this.http.post<any>(`${API}espacos/create`, params, { headers: header });
    }

    listarInstituicoes(): Observable<any> {
        return this.http.get(this.API_BuscarInsituicoes);
      }
}
