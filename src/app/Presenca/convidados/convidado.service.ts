// ANGULAR -----
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// DEPENDECE -----
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// SERVICE -----
import { TokenService } from 'src/app/authentication/token.service';
// INTERFACE -----
import { MarransatoMode } from 'src/shared/MaranssatoMode.interface';
import { Pessoa } from './lista-convidados/pessoa';
import { Status } from './lista-convidados/status';
import { Convidado } from './convidado';

const API = environment.API;
@Injectable({
  providedIn: 'root'
})
export class ConvidadoService {
  
  constructor(
    private tokenService: TokenService,
    private http:HttpClient
  ) { }
  
  private readonly API= `${API}`

//REQUISIÇÕES_DE_CONVIDADOS -----

  listPessoa():Observable<any>{
    return this.http.get<any>(`${this.API}convidados`)
  }

//REQUISIÇÕES_DE_EVENTO -----
  listarStatus(id_evento:number):Observable<MarransatoMode<Status[]>>{
    return this.http.get<MarransatoMode<Status[]>>(`${this.API}solicitacoes/${id_evento}`)
  }

  delet(id_evento:number){
    return this.http.delete(`${this.API}evento/${id_evento}`)
  }
  
  edit(id_evento:any,evento:any):Observable<MarransatoMode<Pessoa[]>>{
    return this.http.put<MarransatoMode<Pessoa[]>>(`${this.API}evento/${id_evento}`,evento)
  }

//REQUISIÇÕES_DE_EVENTO-CONVIDADOS -----
  listConvidado():Observable<any>{
    return this.http.get<any>(`${this.API}convidados`)
  }

  listOneConvidado(id_evento:number):Observable<any>{
    return this.http.get(`${this.API}convidados`)
  }

  editConvidado(id_evento:any,reqBody:any){
    return this.http.patch(`${this.API}evento_convidado/${id_evento}`,reqBody)
  }

  cadastrarConvidado(novoConvidado:any){
   return this.http.post(`${this.API}convidados/convidar`,novoConvidado);
  }

  deletConvidado(id_convidado:number,id_evento:number){
   return this.http.delete(`${this.API}evento_convidado/${id_evento}`,{body:{id_convidado}})
  }

}
