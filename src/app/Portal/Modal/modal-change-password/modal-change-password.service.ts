import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, take} from "rxjs";
import { environment } from "src/environments/environment";
import { TokenService } from '../../../authentication/token.service';

const API = environment.API;

@Injectable({
    providedIn: 'root'
})
export class ModalChangePasswordService {
    constructor(private tokenService: TokenService, private http: HttpClient){}

    private readonly API = `${API}/user/senha`;
    private header = new HttpHeaders().set('Authorization', `Bearer ${this.tokenService.returnToken()}`);

    // updateSenha(email: string, senha: string): Observable<any>{
    //     const body = senha;
    //     console.log("BODY: "+senha )
    //     return this.http.patch(`${this.API}/${email}`,senha,{headers: this.header}).pipe(take(1))
    // }

    updateSenha(email: string, senha: string): Observable<any> {
        var body = { senha: senha };
        console.log("BODY: " + senha);
        return this.http.patch(`${this.API}/${email}`, body, { headers: this.header }).pipe(take(1));
    }

}