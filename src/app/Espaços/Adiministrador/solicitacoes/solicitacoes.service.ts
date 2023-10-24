import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/authentication/token.service';

const API = environment.API;


@Injectable({
  providedIn: 'root'
})
export class SolicitacoesService {

  constructor(
    private tokenService : TokenService,
    private http: HttpClient  
  ) { }

  private readonly API = `${API}/solicitacao`;
  private header = new HttpHeaders().set('Authorization', `Bearer ${this.tokenService.returnToken()}`);


  listarSolicitacoes():Observable<any>{    
    return this.http.get<any>(this.API, { headers: this.header });
  }
}
