// ANGULAR -----
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
// MODAL -----
import { ModalController } from '@ionic/angular';
// COMPONENT -----
import { CadastrarEventoComponent } from './../../components/evento/cadastrar-evento/cadastrar-evento.component';
// SERVICE
import { EventoService } from './../evento.service';
// INTERFACE
import { Evento } from '../evento';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-novo-evento',
  templateUrl: './novo-evento.component.html',
  styleUrls: ['./novo-evento.component.scss', '../../styles/stylespresenca.scss']
})
export class NovoEventoComponent implements OnInit {

  @Input() id_evento: any
  form!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private eventService: EventoService,
    private router: Router,
    private modalController: ModalController,
    public bsModalRef: BsModalRef,
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['',[Validators.required, Validators.minLength(3),Validators.maxLength(80)]],
      descricao: ['',[Validators.required, Validators.minLength(3),Validators.maxLength(1000)]],
      data_hora: ['',[Validators.required, Validators.minLength(10),Validators.maxLength(10)]],

    })
  }
  // cadastrar() {
  //   if (this.form.valid) {
  //     const reqBody = this.form.getRawValue() as Evento;
  //     this.eventService.cadastrarNovoEvento(reqBody).subscribe(
  //       () => {
  //         this.router.navigate(['/eventos']);
  //       },
  //       (error: any) => {
  //         console.log(error);
  //       },
  //     );
  //   }
  // }

  onSubmit(){
    this.submitted = true;
    console.log(this.form.valid);
    if(this.form.valid){
      console.log('Submit');
      this.eventService.addEvent(this.form.value).subscribe(
        sucess => console.log('Sucesso'),
        error => console.log('Error'),
        () => console.log('Request Completo')
      )
      window.location.reload();
    }

  }


  adicionar() {
    this.modalController.dismiss();
  }
  fecharModal(): void {
    this.modalController.dismiss() //Fecha o Modal
  }
}
