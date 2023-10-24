import { TokenService } from 'src/app/authentication/token.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, switchMap, take } from 'rxjs';
import { UserService } from 'src/app/authentication/user/user.service';

const API = environment.API;

@Injectable({
  providedIn: 'root'
})
export class SolicitarService {
  private readonly API_SolicitarAgendamento=`${API}/solicitacao`;
  private readonly API_BuscarEspacos=`${API}/espacos/`;
  //header: HttpHeaders | { [header: string]: string | string[]; } | undefined;

  constructor(private http: HttpClient, private tokenService : TokenService, private userService: UserService) { }

  private header = new HttpHeaders().set('Authorization', `Bearer ${this.tokenService.returnToken()}`);

  private getHeader(): HttpHeaders {
    const token = this.tokenService.returnToken();
    let userId: number | undefined = this.userService.returnUser().value.id;
    userId = userId !== undefined ? userId : 0;
  
    return new HttpHeaders().set('Authorization', `Bearer ${token}`).set('X-User-ID', userId.toString());
  }

  solicitar(espacoSelecionado:number, data:string, horario_entrada:string, horario_saida:string, descricao:string):Observable<any>{

    const header = this.getHeader();

    return this.userService.returnUser().pipe(
      take(1),
      switchMap(user => {
        const userId = user.id;

    return this.http.post<any>(this.API_SolicitarAgendamento, {
      status_solicitacao: 0,
      data_solicitacao: '31/12/2022',
      quantidade: 20, 
      data_inicio: data,
      data_termino: '2023/07/03', 
      hora_inicio: horario_entrada, 
      hora_termino: horario_saida, 
      descricao: descricao,
      id_espaco: espacoSelecionado,              
      id_usuario: userId
      }, {headers: this.header})
  })
  );
}

  listarEspacos():Observable<any>{
  
    return this.http.get<any>(this.API_BuscarEspacos, { headers: this.header })
  }
  
}
