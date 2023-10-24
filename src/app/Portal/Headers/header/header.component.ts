import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/authentication/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  constructor(private tokenService: TokenService, private router: Router) {}

  ngOnInit(): void{}

  logout():any{
    this.tokenService.deleteToken();
    this.router.navigate(['/login']);
  }
}
