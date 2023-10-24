import { Instituicoes } from './../../Eventos/cad-eventos/instituicao';
import { RegisterService } from './register.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalAvisoComponent } from '../Modal/modal-aviso/modal-aviso.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  form: FormGroup;
  submitted = false;
  instituicoes: Instituicoes[] = [];

  constructor(
    private router: Router, 
    private fb: FormBuilder,
    private service: RegisterService,
    private modalService: BsModalService
  ){
    this.form = this.fb.group({
      nome: [null,[Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      email: [null,[Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      senha: [null,[Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      telefone: [null,[Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      nivel_acesso: "Solicitante",
      statusUsuario: 0,
      id_instituicao: 1
    });
  }

  bsModalRef?: BsModalRef;

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('Submit');
      this.service.create(this.form.value).subscribe(
        sucess => console.log('Sucesso'),
        error => console.log('Error'),
        () => console.log('Request Completo')
      );
      this.openModalWithComponent()
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    // console.log("Cancel")
  }

  irParaLogin() {
    this.router.navigate(['/login']);
  }

  ngOnInit(){
    this.service.listarInstituicoes().subscribe(
      (results) => {
        this.instituicoes = results.results;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openModalWithComponent() {
    this.bsModalRef = this.modalService.show(ModalAvisoComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}