// ANGULAR -----
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
// SERVICE -----
import { TokenService } from 'src/app/authentication/token.service';
// INTERFACE -----
import { Pessoa } from "./pessoa";
// IMPORTS -----
import { environment } from 'src/environments/environment';

const API = environment.API;
@Injectable({
  providedIn: "root",
})
export class PessoaService {
  private readonly API = `${API}convidados`;
  constructor(private http: HttpClient, private tokenService : TokenService) {}


  listar(): Observable<any> {
    return this.http.get<any>(`${this.API}`);
  }

  cadPessoa(reqBody:Pessoa){
    return this.http.post(`${this.API}/create`,reqBody);
  }
  updatePessoa(id: number,reqBody: any):Observable<any>{
    console.log(reqBody)
    return this.http.patch<any>(`${this.API}/update/${id}`,reqBody);
  }

  deletarPessoa(id:number){
    return this.http.delete(`${this.API}/delete/${id}`)
  }
}
