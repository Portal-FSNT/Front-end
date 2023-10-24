// ANGULAR -----
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
// MODAL -----
import { ModalController } from "@ionic/angular";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
// COMPONENT ------
import { NovoEventoComponent } from './../novo-evento/novo-evento.component';
// SERVICE -----
import { EventoService } from './../evento.service';
// INTERFACE -----
import { Evento } from '../evento';
// PIPE -----
import { DatePipe } from 'src/pipes/date.pipe';

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.scss',"../../navbar-adm.scss"]
})
export class ListaEventosComponent implements OnInit {
  id_evento !: Number;
  listaEvento : Evento[]=[];

  constructor(
    private modalController:ModalController,
    private service:EventoService,
    private route:Router,
    private modalService: BsModalService
    ){}

  ngOnInit(): void {
    this.service.listar().subscribe((event)=>{
      this.listaEvento=event.result as Evento[]
      console.log(this.listaEvento) 
    });
  }

  editar(id:number){
    this.route.navigate(['/lista-convidados',id]);
    console.log('ID_EVENTO - '+id)
  }

  async add(){
    console.log("Modal")
    const modal = await this.modalController.create({
      component:NovoEventoComponent,
      cssClass:'modal',
      componentProps:{
        id_evento:this.id_evento
      }
      // initialBreakpoint:1,
      // breakpoints:[0,0.4,5,1]

    });

    await modal.present();

    const res=await modal.onDidDismiss();
}


bsModalRef?: BsModalRef;
novoEvento(){
  this.bsModalRef = this.modalService.show(NovoEventoComponent);
  this.bsModalRef.content.closeBtnName = 'Close';
}



}
