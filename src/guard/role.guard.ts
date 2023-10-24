import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../app/authentication/authentication.service';
import { UserService } from '../app/authentication/user/user.service';
import { TokenService } from '../app/authentication/token.service';
import jwt_decode from 'jwt-decode';
import { User } from '../app/authentication/user/user';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(public auth: AuthService, public router: Router, private userService: UserService, private tokenService: TokenService,
    ) {}
  canActivate(

    
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const expectedRole:[] = route.data['expectedRole'];
    const token = this.tokenService.returnToken();
    const user = jwt_decode(token) as User;

    // console.log(user)
    // console.log(expectedRole)
    // console.log(route)
    // console.log(expectedRole.find((element:any) => element === user["nivelAcesso"]))
    
    if (
      // !this.auth.isAuthenticated() || 
      expectedRole.find((element:any) => element === user["nivel_acesso"])
    ) {
      return true;
    }
    return false;
  }
  
}
