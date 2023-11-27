import { TokenService } from 'src/app/authentication/token.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, switchMap, take } from 'rxjs';
import { UserService } from 'src/app/authentication/user/user.service';
import { Espaco } from './espaco';

const API = environment.API;

@Injectable({
  providedIn: 'root'
})
export class SolicitarService {
  private readonly API_SolicitarAgendamento=`${API}solicitacoes/solicitar`;
  private readonly API_listarEspacos=`${API}espacos`;
  //header: HttpHeaders | { [header: string]: string | string[]; } | undefined;

  constructor(private http: HttpClient, private tokenService : TokenService, private userService: UserService) { }

  private getHeader(): HttpHeaders {
    const token = this.tokenService.returnToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  
  create(novoCampo: Espaco): Observable<any> {
    const header = this.getHeader();
    const params = { ...novoCampo }; 

    return this.http.post<any>(`${API}solicitacoes/solicitar`, params, { headers: header });
  }
    

  listarEspacos(): Observable<any> {
   return this.http.get(this.API_listarEspacos);
  }
  
}
