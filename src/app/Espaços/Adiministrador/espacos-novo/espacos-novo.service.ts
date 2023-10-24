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

    constructor(private tokenService : TokenService, private http: HttpClient) { }

    private readonly API=`${API}/espaco`;
    private header = new HttpHeaders().set('Authorization', `Bearer ${this.tokenService.returnToken()}`);
  
   

    cadastrarEspaco(espaco:Espaco):Observable<any>{
        return this.http.post<any>(this.API, {
            nome: espaco.nome,
            ponto_referencia: espaco.ponto_referencia,
            descricao: espaco.descricao,
        }, { headers: this.header})
    }
}
