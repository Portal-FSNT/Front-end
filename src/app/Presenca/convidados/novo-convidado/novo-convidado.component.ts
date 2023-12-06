//ANGULAR -----
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
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

  form: FormGroup = new FormGroup({
    id_evento: new FormControl(undefined, [Validators.required]),
    id_convidado: new FormControl(undefined, [Validators.required])
  });
  pessoa!: Convidado[];
  submitted = false;

  @Input() id_evento: number | undefined
  public errorAlreadyInvited = false;
  constructor(
    private fb: FormBuilder,
    private service: ConvidadoService,
    private modalController: ModalController,
    public bsModalRef: BsModalRef,
  ) { }

  ngOnInit() {
    console.log("idEve: ", this.id_evento)
    this.form.get('id_evento')!.setValue(this.id_evento)
    this.service.listConvidado().subscribe({
      next: (event) => {
        this.pessoa = event
        console.log(this.pessoa, event);
      },
      error: (error) => {
        console.log('erro: ', error);
      }
    })

  }

  onSubmit() {
    this.submitted = true;
    this.errorAlreadyInvited = false
    console.log(this.form.get('id_convidado')?.errors)

    if (this.form.valid) {
      // this.service.cadastrarConvidado(this.form.value).subscribe(
      //   sucess => console.log('Sucesso'),
      //   error => console.log('Error'),
      //   () => console.log('Requisição Finalizada.')
      // );
      this.service.cadastrarConvidado(this.form.value).subscribe({
        next: (event) => {
          this.modalController.dismiss(undefined,'user_added')
        },
        error: (error) => {
          const { status } = error
          this.errorAlreadyInvited = true
          console.log('erro: ', error);
        },

      })

    }
  }

  cancelar() { this.modalController.dismiss() }
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