import { Instituicoes } from './../../Eventos/cad-eventos/instituicao';
import { MarransatoMode } from '../../../shared/MaranssatoMode.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';

const API = environment.API;

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  private readonly API = `${API}users/create`;
  private readonly API_BuscarInstituicoes = `${API}instituicoes`

  listarInstituicoes(): Observable<MarransatoMode<Instituicoes[]>> {
    return this.http.get<MarransatoMode<Instituicoes[]>>(this.API_BuscarInstituicoes)
  }

  
  create(usuario: any){
    return this.http.post(this.API, usuario).pipe(take(1));
  }
}
