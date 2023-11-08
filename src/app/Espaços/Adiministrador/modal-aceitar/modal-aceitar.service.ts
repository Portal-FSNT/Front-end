import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/authentication/token.service';

@Injectable({
  providedIn: 'root'
})
export class ModalAceitarService {

  private readonly API = environment.API;

  constructor(
    private tokenService: TokenService,
    private http: HttpClient
  ) { }

  aceptSolicitacao(id: number):Observable<any>{

    return this.http.patch<any>(`${this.API}solicitacoes/aprovar/${id}`, null)
  }

  deniSolicitacao(id: number):Observable<any>{
    
    return this.http.patch<any>(`${this.API}solicitacoes/rejeitar/${id}`, null)
  }

}
