//ANGULAR -----
import { Component, OnInit,Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
//MODAL -----
import { ModalController } from '@ionic/angular';
//SERVICE -----
import { EventoService } from "./../evento.service";
//INTERFACE -----
import { EventoEdit } from "./eventoedit";
import { Evento } from "../evento";
import { BsModalRef } from "ngx-bootstrap/modal";


@Component({
  selector: "app-editar-evento",
  templateUrl: "./editar-evento.component.html",
  styleUrls: ["./editar-evento.component.scss","../../styles/stylespresenca.scss"],
})
export class EditarEventoComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  updateEvento: EventoEdit[] = [];
  list: string[] = [];

  @Input() id_evento:any
  constructor(
    private modalController:ModalController,
    private route: ActivatedRoute,
    private router: Router,
    private service: EventoService,
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,

  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: this.list[0],
      data_hora: this.list[1],
      descricao: this.list[2],
    })

    console.log('Evento: '+this.list);
  }

  onSubmit(){
    this.submitted = true

    const reqBody = {
      data_hora: this.form.value.data_hora,
      descricao: this.form.value.descricao,
    }

    console.log(reqBody);

    if(this.form.valid){
      this.service.edit(this.form.value.id, reqBody).subscribe(
        success => console.log('Sucesso'),
        error => console.log('Error'),
        () => console.log('Requisição Finalizada')
      )
      window.location.reload();
    }
  }

  salvar() {
    this.onSubmit();
  }

  cancelar() {window.location.reload();}
}

//IMPORT_DO_PROJETO_ORIGINAL -----
    // import * as dayjs from 'dayjs'

//PROJETO_ORIGINAL - DENTRO DO ngOnInit(){} ------
    // console.log(this.id_evento)
    // this.editarEventoForm = this.formBuilder.group({
    //   descricao: [''],
    //   data_hora: [''],
    // });
    // this.service.listarUm(this.id_evento).subscribe((event)=>{
    //   this.listaEventos=event.result as any;
    //   console.log(event)
    //   console.log(this.listaEventos)
    //  // console.log(dayjs(this.listaEventos[0].data_hora).format("MM/DD/YYYY"))
    //   this.editarEventoForm.patchValue({
    //    //  data_hora:dayjs(this.listaEventos[0].data_hora).format('YYYY-MM-DD'),
    //     descricao:this.listaEventos[0].descricao

    //   })
    // })

//PROJETO_ORIGINAL - FUNÇÃO_EDITAR_EVENTO -----
    // editar() {
    //   if (this.form.valid) {
    //     const editarEvento = this.form.getRawValue() as EventoEdit;
    //     this.service
    //       .edit(this.id_evento, editarEvento)
        
    //       .subscribe(() => this.router.navigate([`evento_convidados/${this.id_evento}`])
    //       );
    //       console.log(this.id_evento,editarEvento);
    //   }
    // }