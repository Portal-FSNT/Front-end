import { Token } from "@angular/compiler";
import { Injectable } from "@angular/core";

const KEY = 'token';

@Injectable({
    providedIn: "root"
})
export class TokenService {

    constructor(){}

    saveToken(token: string){
        localStorage.setItem(KEY, token);
        console.log(token);
    }

    returnToken(){
        console.log();
        return localStorage.getItem(KEY) ?? '';
    }

    deleteToken(){
        localStorage.removeItem(KEY);
    }

    haveToken(){
        console.log(this.returnToken);
        return !!this.returnToken();
    }
}