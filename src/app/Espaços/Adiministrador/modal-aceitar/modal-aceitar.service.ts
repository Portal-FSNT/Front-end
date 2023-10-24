import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/authentication/token.service';

const API = environment.API

@Injectable({
  providedIn: 'root'
})
export class ModalAceitarService {

  private readonly API=`${API}/aprovar_solicitacao`;

  constructor(
    private tokenService: TokenService,
    private http: HttpClient
  ) { }

  aceptSolicitacao(idSolicitacao: number):Observable<any>{

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenService.returnToken()}`,
    })

    const body = {status_solicitacao: 1};

    return this.http.patch<any>(`${this.API}/${idSolicitacao}`,body,{headers})
  }

  deniSolicitacao(idSolicitacao: number):Observable<any>{

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenService.returnToken()}`,
    })

    const body = {status_solicitacao: 2};
    
    return this.http.patch<any>(`${this.API}/${idSolicitacao}`,body,{headers})
  }
}
