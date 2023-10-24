import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API = environment.API;

@Injectable({
  providedIn: 'root'
})
export class Login {

  constructor(private http: HttpClient) { }

  private readonly API = `${API}/login`;
  
  // doLogin():{
  //   return this.http.post(${API/login, newLogin});
  // }

}