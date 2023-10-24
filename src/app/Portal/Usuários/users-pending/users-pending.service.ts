import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from '../../../authentication/token.service';

const API = environment.API;

@Injectable({
  providedIn: 'root'
})
export class UsersPendingService {

  constructor(private tokenService : TokenService, private http: HttpClient) { }
  private header = new HttpHeaders().set('Authorization', `Bearer ${this.tokenService.returnToken()}`);

  listUsersPending(): Observable<any> {
    return this.http.get<any>(`${API}/userstatus`, {headers: this.header});
  }
  changeStatus(): Observable<any> {
    return this.http.get<any>(`${API}/userstatus`, {headers: this.header});
  }

}
