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
  private header = new HttpHeaders().set('Authorization', `Bearer ${this.tokenService.returnToken()}`);

//REQUISIÇÕES_DE_CONVIDADOS -----
  listPessoa():Observable<any>{
    return this.http.get<any>(`${this.API}/convidados`,{ headers: this.header})
  }

//REQUISIÇÕES_DE_EVENTO -----
  listarStatus(id_evento:number):Observable<MarransatoMode<Status[]>>{
    return this.http.get<MarransatoMode<Status[]>>(`${this.API}/evento/${id_evento}`,{ headers: this.header})
  }

  delet(id_evento:number){
    return this.http.delete(`${this.API}/evento/${id_evento}`,{ headers: this.header})
  }
  
  edit(id_evento:any,evento:any):Observable<MarransatoMode<Pessoa[]>>{
    return this.http.put<MarransatoMode<Pessoa[]>>(`${this.API}/evento/${id_evento}`,evento,{ headers: this.header})
  }

//REQUISIÇÕES_DE_EVENTO-CONVIDADOS -----
  listConvidado():Observable<any>{
    return this.http.get<any>(`${this.API}/evento_convidado`,{ headers: this.header})
  }

  listOneConvidado(id_evento:number):Observable<any>{
    return this.http.get(`${this.API}/evento_convidado/${id_evento}`,{ headers: this.header})
  }

  editConvidado(id_evento:any,reqBody:any){
    return this.http.patch(`${this.API}/evento_convidado/${id_evento}`,reqBody,{ headers: this.header})
  }

  cadastrarConvidado(novoConvidado:any){
   return this.http.post(`${this.API}/evento_convidado`,novoConvidado,{ headers: this.header});
  }

  deletConvidado(id_convidado:number,id_evento:number){
    return this.http.delete(`${this.API}/evento_convidado/${id_evento}`,{body:{id_convidado}, headers: this.header})
  }

}

// PROJETO_ANTIGO -----
    // buscar:any=(id_evento:any)=>{
    //   return this.buscar(`${this.API}/${id_evento}`,{ headers: this.header})
    // }