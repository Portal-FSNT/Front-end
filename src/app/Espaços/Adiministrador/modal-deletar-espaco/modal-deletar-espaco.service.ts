import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { TokenService } from 'src/app/authentication/token.service';

const API = environment.API;

@Injectable({
    providedIn: 'root'
})
export class ModalDeletarEspacosService {
    constructor(private tokenService : TokenService, private http: HttpClient) { }

    private readonly API=`${API}/espaco`;
    private header = new HttpHeaders().set('Authorization', `Bearer ${this.tokenService.returnToken()}`);

    deletarEspaco(idEspaco: number):Observable<any>{

        return this.http.delete<any>(`${this.API}/${idEspaco}`, { headers: this.header})
    }
}
