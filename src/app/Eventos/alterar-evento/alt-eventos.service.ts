import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CadEventos } from './cad-eventos';
import { TokenService } from 'src/app/authentication/token.service';
import { Observable, switchMap, take } from 'rxjs';
import { TipoEvento } from './tipo';
import { Lugares } from './lugar';
import { Instituicoes } from './instituicao';
import { MarransatoMode } from 'src/shared/MaranssatoMode.interface';
import { UserService } from 'src/app/authentication/user/user.service';

const API = environment.API;

@Injectable({
  providedIn: 'root'
})
export class AltEventosService {
  [x: string]: any;

  
  private readonly API_BuscarTipos = `${API}/tipos`;
  private readonly API_BuscarInstituicoes = `${API}instituicoes`;
  private readonly API_BuscarLugares = `${API}espacos`;
  private readonly API_DeletarEventos = `${API}eventos/delete`;

  constructor(private http: HttpClient, private tokenService : TokenService, private userService: UserService) { }

  private header = new HttpHeaders().set('Authorization', `Bearer ${this.tokenService.returnToken()}`);

  private getHeader(): HttpHeaders {
    const token = this.tokenService.returnToken();

    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  buscarEventoPorId(eventId: number): Observable<{result: CadEventos}> {
    const header = this.getHeader();
    return this.http.get<{result: CadEventos}>(`${API}eventos/${eventId}`, { headers: header });
  }

  updateEvento(id: number, nome: any): Observable<any> {
    console.log(id);
    return this.http.patch<any>(`${API}update/${id}`, nome);
  }

  listarTipos(): Observable<MarransatoMode<TipoEvento[]>> {
    return this.http.get<MarransatoMode<TipoEvento[]>>(this.API_BuscarTipos, { headers: this.header })
  }

  listarInstituicoes(): Observable<MarransatoMode<Instituicoes[]>> {  
    return this.http.get<MarransatoMode<Instituicoes[]>>(this.API_BuscarInstituicoes, { headers: this.header })
  }
  
  listarLugares(): Observable<any> {  
    return this.http.get(this.API_BuscarLugares, { headers: this.header })
  }

  deletarEvento(id: number): Observable<any> {
    const header = this.getHeader();
  
    const deleteUrl = `${this.API_DeletarEventos}/${id}`;
  
    return this.http.delete<any>(deleteUrl, { headers: header });
  }

}