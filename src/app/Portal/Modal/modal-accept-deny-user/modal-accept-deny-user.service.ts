import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, take} from "rxjs";
import { environment } from "src/environments/environment";
import { TokenService } from '../../../authentication/token.service';

const API = environment.API;

@Injectable({
    providedIn: 'root'
})
export class ModalAcceptDenyUserSerivce {
    constructor(private tokenService: TokenService, private http: HttpClient){}

    private readonly API = `${API}/user/userstatus`;
    private header = new HttpHeaders().set('Authorization', `Bearer ${this.tokenService.returnToken()}`);

    UpdateUsers(email: string, statusUsuario: number): Observable<any>{
        const body = { status_usuario: statusUsuario };
        return this.http.patch(`${this.API}/${email}`,body,{headers: this.header}).pipe(take(1))
    }
}