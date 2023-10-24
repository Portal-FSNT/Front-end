import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/authentication/token.service';

@Component({
  selector: 'app-header-solicitante',
  templateUrl: './header-solicitante.component.html',
  styleUrls: ['./header-solicitante.component.scss']
})
export class HeaderSolicitanteComponent {
  constructor(private tokenService: TokenService, private router: Router) {}

  logout():any{
    this.tokenService.deleteToken();
    this.router.navigate(['/login']);
  }
}
