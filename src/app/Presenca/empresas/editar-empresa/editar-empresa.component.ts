// ANGULAR -----
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit,Input } from '@angular/core';
// MODAL -----
import { ModalController } from '@ionic/angular';
// SERVICE -----
import { EmpresaService } from './../empresa.service';
// INTERFACE -----
import { Empresa } from '../nova-empresa/empresa';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.scss', '../../styles/stylespresenca.scss']
})
export class EditarEmpresaComponent implements OnInit {

form!:FormGroup;
list: string[] = [];


@Input() empresa:any
@Input() empresas:any

output:any;

  constructor(
    private fb : FormBuilder,
    private router:Router,
    private modalController:ModalController,
    private service:EmpresaService,
    public bsModalRef: BsModalRef,
  ) { }

  ngOnInit(){
    this.form = this.fb.group({
      id: this.list[0],
      nome: this.list[1]
    });
  }
   
  editar(){
    if(this.form.valid){
      this.service.updateEmpresa(this.empresa, this.form.value).subscribe(()=>{this.router.navigate(['empresas'])})
    }
  }

  updateEmpresa(id: number){
    if(this.form.valid){

      const reqBody = {
        nome: this.form.value.nome
      }

      console.log('Submit');
      this.service.updateEmpresa(id, reqBody).subscribe(
        success => console.log('Sucesso'),
        error => console.log('Error'),
        () => console.log('Requisição completa.')  
      );
      window.location.reload();
    }
  }

  // salvar(){  this.modalController.dismiss(); }

  cancelar(){ 
    window.location.reload();
  }
}
