//ANGULAR -----
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, switchMap, take } from 'rxjs';
//SERVICE -----
import { TokenService } from 'src/app/authentication/token.service';
import { UserService } from 'src/app/authentication/user/user.service';
//INTERFACE -----
import { Evento } from './evento';
//IMPORTS -----
import { environment } from 'src/environments/environment';

const API = environment.API;

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private readonly API=`${API}/evento`;

  constructor(
    private http: HttpClient, 
    private tokenService : TokenService,
    private userService: UserService 
  ) { }

  private getHeader(): HttpHeaders {
    const token = this.tokenService.returnToken();
    let id_usuario: number | undefined = this.userService.returnUser().value.id;
    id_usuario = id_usuario !== undefined ? id_usuario : 0;
  
    return new HttpHeaders().set('Authorization', `Bearer ${token}`).set('X-User-ID', id_usuario.toString());
  }

  private header = this.getHeader();

  listar():Observable<any>{
    return this.http.get<any>(this.API, { headers: this.header });
  }
  listarUm(id_evento:any):Observable<any>{
    return this.http.get(`${API}/evento/${id_evento}`, { headers: this.header })
  }
  edit(id_evento:number,reqBody:any){
    return this.http.patch<any>(`${this.API}/${id_evento}`,reqBody, { headers: this.header })
  }

  addEvent(form:any){
    return this.userService.returnUser().pipe(
      take(1),
      switchMap(user => {
        const id_usuario = user.id;
      
    const reqBody = [{
      nome: form.nome,
      data_hora: form.data_hora,
      descricao: form.descricao,
      id_usuario: id_usuario
    }]

    console.log(reqBody);
    console.log(this.header);

    return this.http.post(this.API,{
      nome: form.nome,
      data_hora: form.data_hora,
      descricao: form.descricao,
      id_usuario: id_usuario
    }, { headers: this.header});
    
    })
    )
  }

  cadastrarNovoEvento(reqBody:Evento){
    return this.http.post(`${API}`,reqBody, { headers: this.header });
  }
}
