import { TokenService } from 'src/app/authentication/token.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = environment.API;

@Injectable({
  providedIn: 'root'
})
export class VisualizarService {
  
  constructor(private http: HttpClient, private tokenService : TokenService) { }

  private readonly API=`${API}/solicitacao`
  private header = new HttpHeaders().set('Authorization', `Bearer ${this.tokenService.returnToken()}`);

  visualizarAgendamentos():Observable<any>{
   
    return this.http.get<any>(this.API, { headers: this.header });
  }
}
