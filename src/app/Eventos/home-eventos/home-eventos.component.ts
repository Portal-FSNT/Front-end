import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Evento } from './evento';
import { EventoService } from './evento.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home-eventos.component.html',
  styleUrls: ['./home-eventos.component.scss' , '../styles.scss']
})
export class HomeEventosComponent implements OnInit {


  

  eventos:Evento[]=[];

  constructor(private modalController:ModalController, private service: EventoService, private router: Router) { }



  ngOnInit() {
    this.service.listarEvento().subscribe((event)=>{
      this.eventos = event.result as Evento[]
      console.log(this.eventos)
    })
  }


  changeEvent(card: any) {
    this.router.navigate(['/alterar-evento', card.id]); // Substitua 'card.id' pelo identificador único do evento que você deseja alterar

  }   



  
}
