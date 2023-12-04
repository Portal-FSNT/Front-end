import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/authentication/token.service';
import { UserService } from 'src/app/authentication/user/user.service';


const API = environment.API;
@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private readonly  API = `${API}eventos`;

  constructor(private http: HttpClient, private tokenService : TokenService, private userService: UserService) { }

  private header = new HttpHeaders().set('Authorization', `Bearer ${this.tokenService.returnToken()}`);

  private getHeader(): HttpHeaders {
    const token = this.tokenService.returnToken();

    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  listarEvento():Observable<any>{
    return this.http.get<any>(this.API)
  }

  delet(id: number) {
    return this.http.delete(`${this.API}/delete/${id}`);
  }

  updateEvento(id: number,reqBody: any):Observable<any>{
    console.log(reqBody)
    return this.http.patch<any>(`${this.API}/update/${id}`,reqBody);
  }
}