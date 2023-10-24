//ANGULAR -----
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
//MODAL -----
import { ModalController } from '@ionic/angular';
//SERVICE -----
import { ConvidadoService } from './../convidado.service';
//INTERFACES -----
import { Convidado } from '../convidado';
import { Pessoa } from '../lista-convidados/pessoa';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-novo-convidado',
  templateUrl: './novo-convidado.component.html',
  styleUrls: ['./novo-convidado.component.scss', '../../styles/stylespresenca.scss']
})
export class NovoConvidadoComponent implements OnInit {

  form!:FormGroup;
  list!: any[];
  pessoa!: Convidado[];
  submitted = false;

@Input() id_evento: number | undefined
  constructor(
    private fb:FormBuilder,
    private service:ConvidadoService,
    private modalController:ModalController,
    public bsModalRef: BsModalRef,
  ) { }

  ngOnInit(){
    if(this.list && this.list.length > 0){
      this.id_evento = this.list[0];
      console.log('EVENTO_ID - '+this.id_evento)
    }

    this.form=this.fb.group({
      condicao: 'Pendente',
      anunciado: 0,
      presenca: 0,
      id_convidado: [Number],
      id_presenca: this.id_evento,
    });

    this.service.listPessoa().subscribe(
      (results) => {
        this.pessoa = results.result;
        console.log('Lista de Pessoas: '+this.pessoa); 
      },
      (error) => {
        console.error(error)
      }
    )

  }

  onSubmit(){
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('Submit');
      this.service.cadastrarConvidado(this.form.value).subscribe(
        sucess => console.log('Sucesso'),
        error => console.log('Error'),
        () => console.log('Requisição Finalizada.')
      );
      window.location.reload();
    }
  }

  salvar(){
    this.onSubmit();
    this.modalController.dismiss();
  }
  cancelar(){ this.modalController.dismiss()}
}

//PROJETO_ORIGINAL -----
  // cadastrar(){
  //   if(this.form.valid){
  //     const novoConvidado= this.form.getRawValue();
  //     this.servie.cadastrarconvidado(this.id_evento,novoConvidado).subscribe(
  //       ()=>{this.router.navigate([`/evento_convidados/${this.id_evento}`])},
  //       (error:any)=>{
  //         console.log(error)
  //       }
  //     )
  // }}