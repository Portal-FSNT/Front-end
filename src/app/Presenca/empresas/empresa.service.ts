import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Empresa } from "./empresa";
import { TokenService } from "src/app/authentication/token.service";

const API = environment.API;

@Injectable({
  providedIn: "root",
})
export class EmpresaService {

  constructor(
    private tokenService: TokenService,
    private http: HttpClient
  ) {}

  private readonly API = `${API}empresas`;

  listar(): Observable<any> {
    return this.http.get(`${this.API}`);
  }

  cadEmpresa(novaEmpresa: string) {
    console.log(novaEmpresa)
    return this.http.post(`${this.API}/create`,novaEmpresa);
  }

  updateEmpresa(id: number, nome: any): Observable<any> {
    console.log(id);
    return this.http.patch<any>(`${this.API}update/${id}`, nome);
  }

  deletarEmpresas(id: number): Observable<any>{
    return this.http.delete<any>(`${this.API}/delete/${id}`)
  }
}
