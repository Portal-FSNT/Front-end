import { environment } from "src/environments/environment";
import { UserService } from "./user/user.service";
import { Injectable, } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, tap } from "rxjs";

const API = environment.API;
@Injectable({
    providedIn: "root",
})
export class AuthService {
    constructor(
        private HttpClient: HttpClient,
        private userService: UserService
    ){}

    doLogin(email: string, senha:string): Observable<HttpResponse<any>>{
        return this.HttpClient.post(
            `${API}users/login`,
            {
                email: email,
                senha: senha,
            },
            { observe: 'response'}
        ).pipe(
            tap((res: any) =>{
                const authToken= res.body!.token ?? '';
                this.userService.saveToken(authToken); 
            })
        )
    }
}
