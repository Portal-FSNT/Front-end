import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-type-register',
  templateUrl: './type-register.component.html',
  styleUrls: ['./type-register.component.scss']
})
export class TypeRegisterComponent {
  constructor(private router: Router) { }
  

  irParaLogin() {
    this.router.navigate(['/login']);
  }

  irParaCadastro() {
    this.router.navigate(['/register'])
  }
}
