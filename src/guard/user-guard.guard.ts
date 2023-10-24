import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../app/authentication/authentication.service';
import { UserService } from '../app/authentication/user/user.service';
import { TokenService } from '../app/authentication/token.service';
import { User } from '../app/authentication/user/user';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class UserAdm implements CanActivate {

  
  constructor(public auth: AuthService, public router: Router, private userService: UserService, private tokenService: TokenService,
    ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.tokenService.returnToken();
    const user = jwt_decode(token) as User;
    if (user) {
      return true
    }
    return false;
  }

  
}
