import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/authentication/token.service';



const API = environment.API;

@Injectable({
  providedIn: 'root'
})
export class NewAdmService {
  
  private readonly API_users = `${API}users`;
  private readonly API_BuscarInsituicoes = `${API}instituicoes`;
  private header = new HttpHeaders().set('Authorization', `Bearer ${this.tokenService.returnToken()}`);


  constructor(private http: HttpClient, private tokenService : TokenService) { }


  private getHeader(): HttpHeaders {
    const token = this.tokenService.returnToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  create(usuario: any): Observable<any> {
    const header = this.getHeader();
    return this.http.post<any>(`${API}users/create`, usuario, { headers: header });
  }

  listarInstituicoes(): Observable<any> {
    return this.http.get(this.API_BuscarInsituicoes);
}
}
