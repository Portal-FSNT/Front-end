import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../authentication/authentication.service';
import jwt_decode from 'jwt-decode';
import { TokenService } from 'src/app/authentication/token.service';
import { User } from 'src/app/authentication/user/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = '';
  senha = '';

  constructor(private authservice: AuthService, private router: Router,  private tokenService: TokenService) {}

  ngOnInit(): void {
  }

  doLogin(): any{
    this.authservice.doLogin(this.email, this.senha).subscribe({
      next: (res)=> {
        const user = jwt_decode(res.body.token) as User;
        this.tokenService.saveToken(res.body.token);
        this.tokenService.returnToken();

        if(user["nivel_acesso"] === 'Solicitante'){

          return this.router.navigate(['/solicitar']);
        }
        if(user["nivel_acesso"] === 'Administrador'){

          return this.router.navigate(['/home']);
        }
        if(user["nivel_acesso"] === 'Visualizador'){
          return this.router.navigate(['/eventos-presenca']);
        }
         return this.router.navigate(['/home']);
      },
      error:(error)=>{
        alert('Email ou senha inválido.');
        console.log(error);
      },
    });
  }


  irParaTipoCadastro() {
    this.router.navigate(['/type-register']);
  }

}
