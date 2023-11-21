import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API = environment.API;
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly API = `${API}users`;
  constructor(private http: HttpClient) { }

  listUsers(): Observable<any> {
    return this.http.get<any>(this.API);
  } 

}
