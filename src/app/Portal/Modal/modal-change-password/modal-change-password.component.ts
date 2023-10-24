import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalChangePasswordService } from './modal-change-password.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-modal-change-password',
  templateUrl: './modal-change-password.component.html',
  styleUrls: ['./modal-change-password.component.scss']
})
export class ModalChangePasswordComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  @Input() email?: string;
  list: any[] = [];

  constructor(
    private router: Router, 
    private fb: FormBuilder,
    private service: ModalChangePasswordService,
    public bsModalRef: BsModalRef, 
    private modalService: BsModalService
  ) {
    this.form = this.fb.group({
      senha: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
    });
  }

  updateSenha() {
    this.submitted = true;
    const senha = this.form.value.senha;

    //console.log("SENHA: " + senha);
    //console.log("EMAIL: " + this.email);

    if (this.form.valid && this.email) {
      console.log('Submit');
      this.service.updateSenha(this.email, senha).subscribe(
        success => { console.log('Sucesso') },
        error => { console.log('Error', error) },
        () => console.log('Request Completo')
      );
      this.router.navigate(['/users']); 
      window.location.reload()
    }
  }

  ngOnInit(): void {
    console.log("AQUI: "+this.email)
    if (this.email) {
      this.form.patchValue({
        email: this.email,
      });
    }
  }
}
