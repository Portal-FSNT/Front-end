//ANGULAR -----
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit ,Input} from '@angular/core';
//MODAL -----
import { ModalController } from '@ionic/angular';
//SERVICE -----
import { ConvidadoService } from './../convidado.service';
//INTERFACE -----
import { Pessoa } from '../lista-convidados/pessoa';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-editar-convidado',
  templateUrl: './editar-convidado.component.html',
  styleUrls: ['./editar-convidado.component.scss', '../../styles/stylespresenca.scss']
})
export class EditarConvidadoComponent implements OnInit {

form!:FormGroup;
submitted = false;
listaConvidado:Pessoa[]=[];
list: string[] = [];

  constructor(
    private service:ConvidadoService,
    private fb:FormBuilder,
    private router:Router,
    private modalController:ModalController,
    public bsModalRef: BsModalRef,
  ) { }

  
  ngOnInit(): void {

    this.form = this.fb.group({
      id_evento:this.list[0],
      id_convidado:this.list[1],
      condicao:this.list[2],
      anunciado:this.list[3],
      presenca:this.list[3],
     
    })
    console.log(this.list);
  }

  onSubmit(){
    this.submitted = true

    const reqBody = {
      id_convidado: this.form.value.id_convidado,
      condicao: this.form.value.condicao,
      anunciado: this.form.value.anunciado,
      presenca: this.form.value.presenca,
    }
    console.log(reqBody);

    if(this.form.valid){
      this.service.editConvidado(this.form.value.id_evento, reqBody).subscribe(
        success => console.log('Sucesso'),
        error => console.log('Error'),
        () => console.log('Requisição Finalizada')
      )
    }
    window.location.reload();
  }

  cancelar(){ window.location.reload();}
  
  salvar(){ this.onSubmit() }
}

// PROJETO_ORIGINAL  -----
    // @Input() id_evento:any
    // @Input() id_convidado:any
    // @Input() condicao:any
    // @Input() anunciados:any
    // @Input() presenca:any

// PROJETO_ORIGINAL - DENTRO DO ngOnInit(){} -----
    // this.convidadoService.listOneConvidado(this.id_evento).subscribe((event)=>{
    //   this.listaConvidado=event.results as Pessoa[];
    // })

// PROJETO_ORIGINAL - FUNÇÃO_EDITAR_CONVIDADO -----
    // editar(){
    //   if(this.form.valid){
    //     const editarConvidado = this.form.getRawValue() as Pessoa;
    //     this.convidadoService.editConvidado(this.id_evento,editarConvidado).subscribe(()=>{
    //       this.router.navigate([`evento_convidados/${this.id_evento}`])
    //     })
    //   }
    // }
