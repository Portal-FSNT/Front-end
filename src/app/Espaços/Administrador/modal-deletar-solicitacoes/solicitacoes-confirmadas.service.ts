import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/authentication/token.service';
import { ActivatedRoute, Router } from '@angular/router';

const API = environment.API;


@Injectable({
  providedIn: 'root'
})
export class SolicitacoesConfirmadasService {

  constructor(
    private tokenService : TokenService,
    private http: HttpClient,
    private router: Router,

  ) { }

  private readonly API = `${API}solicitacoes`;
  private header = new HttpHeaders().set('Authorization', `Bearer ${this.tokenService.returnToken()}`,);
  ;

  listarSolicitacoesConfirmadas():Observable<any>{    
    return this.http.get<any>(this.API, { headers: this.header });
  }

  deletarSolicitacao(id: number): Observable<any>{
    return this.http.delete<any>(`${this.API}/delete/${id}`)
  }
}