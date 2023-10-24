import { Location } from '@angular/common';
import { EmpresaService } from './../../empresas/empresa.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PessoaService } from './../pessoa.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../pessoa';
import { Empresa } from './empresa';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-nova-pessoa',
  templateUrl: './nova-pessoa.component.html',
  styleUrls: ['./nova-pessoa.component.scss', '../../styles/stylespresenca.scss']
})
export class NovaPessoaComponent implements OnInit {

  form!:FormGroup;
  listaPessoa:Empresa[]=[];
  submitted = false;

  constructor(
    private fb:FormBuilder,
    private pessoaService:PessoaService,
    private empresaService:EmpresaService,
    private router:Router,
    private modalController:ModalController,
    public bsModalRef: BsModalRef,

  ) {}

  ngOnInit(): void {
    this.empresaService.listar().subscribe((event)=>{
      this.listaPessoa= event.result as Empresa[];
      console.log(this.listaPessoa)
    })
    this.form=this.fb.group({
      nome:['',[Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      email:['',[Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      cargo :['',[Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      telefone:['',[Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      empresa:[]
    })
  }
  // cadastrar(){
  //   console.log(this.form)
  //   if(this.form.valid){
  //     const novaPessoa=this.form.getRawValue() as Pessoa;
  //     this.pessoaService.cadastrarNovaPessoa(novaPessoa).subscribe(
  //       ()=>{this.router.navigate(['/convidados']);
  //     },
  //     (error)=>{
  //       console.log(error)
  //     },
  //     );
  //   }
  // }

  onSubmit(){
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('Submit');
      this.pessoaService.cadPessoa(this.form.value).subscribe(
        sucess => console.log('Sucesso'),
        error => console.log('Error'),
        () => console.log('Request Completo')  
      );
      window.location.reload();
    }
  }

  adicionar(){
    this.modalController.dismiss();
  }
  cancelar(){
    this.modalController.dismiss();
  }
}
