import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/authentication/token.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.includes(environment.API)){
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${this.tokenService.returnToken()}` }
    });  
    }

    return next.handle(request);
  }
}
