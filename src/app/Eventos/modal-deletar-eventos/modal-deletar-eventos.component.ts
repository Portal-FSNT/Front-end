import { Component, OnInit } from '@angular/core';
import { Evento } from './../home-eventos/evento';
import { NavParams } from '@ionic/angular';
import { ModalDeletarEventosService } from './modal-deletar-eventos.service';
import { ModalController } from '@ionic/angular';
import { Location } from '@angular/common';


@Component({
  selector: 'app-modal-deletar-eventos',
  templateUrl: './modal-deletar-eventos.component.html',
  styleUrls: ['./modal-deletar-eventos.component.scss']
})
export class ModalDeletarEventosComponent {

  constructor(private modalcontroler:ModalController, 
    public navParams: NavParams, private service: ModalDeletarEventosService,
    private location: Location) { }

  exibir:Evento = this.navParams.get('evento')

  ngOnInit(): void {

  }

  fecharModal() {
    this.modalcontroler.dismiss(); //Fecha o Modal
  }
  
  deletarEvento() {
    this.service.deletarEvento(this.exibir.id).subscribe({
      next: (event) => {
        this.fecharModal();
        console.log(event);
        window.location.reload();
      },
      error: (error) => {
        console.error('Há convidados cadastrados nesse evento. Remová-os para excluir o evento.');
        window.alert('Há convidados cadastrados nesse evento. Remová-os para excluir o evento.');
      }
    })
  }


}

  
