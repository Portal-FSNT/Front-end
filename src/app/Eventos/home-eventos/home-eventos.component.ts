import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Evento } from './evento';
import { EventoService } from './evento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AlterarEventoComponent } from './../alterar-evento/alterar-evento.component';




@Component({
  selector: 'app-home-eventos',
  templateUrl: './home-eventos.component.html',
  styleUrls: ['./home-eventos.component.scss' , '../styles.scss']
})
export class HomeEventosComponent implements OnInit {

  @Input() user: any;
  
  @Input() presenca?: boolean;

  eventos: Evento[] = [];

  constructor(
    private modalController:ModalController, 
    private service: EventoService, 
    private router: Router, 
    private route: ActivatedRoute,
    private EventoService: EventoService,
    public bsModalRef: BsModalRef,
    private modalService: BsModalService

    
    ) { }

  ngOnInit() {
    this.service.listarEvento().subscribe((event) => {
      this.eventos = event
      console.log(this.eventos);
    });

    
    // this.presenca = true;
  }

  delet(id: number) {
    // this.service.delet(id).subscribe(
    //   () => {
    //     this.router.navigate(["/empresas"]);
    //   },
    //   (error) => console.log(error)
    // );
    this.service.delet(id).subscribe({
      next: (event) => {
        this.router.navigate(["/eventos"]);
        console.log(event);
      },
      error: (error) => {
        console.log('erro: ', error);
        alert(error.error.message);
      },
      complete: () => {
        window.location.reload();
      }
    })
    
  }
  
  updateEvento(evento: any){
    console.log(evento.id)
    const id = evento.id;
    const nome = evento.nome;
    const descricao = evento.descricao;
    const data_evento = evento.data_evento;
    const hora_inicio = evento.hora_inicio;
    const hora_termino = evento.hora_termino;
    const endereco = evento.endereco;
    const id_espaco = evento.data_evento;
    const tipo_evento = evento.hora_inicio;
    const modalidade = evento.hora_termino;

    const initialState: ModalOptions = {
      initialState: {
        list: [
          id,
          nome,
          descricao,
          data_evento,
          hora_inicio,
          hora_termino,
          endereco,
          id_espaco,
          tipo_evento,
          modalidade,
        ],
        title: 'Modal update evento',
        cssClass:"modal",
      }
    };
    this.bsModalRef = this.modalService.show(AlterarEventoComponent, initialState);
    this.bsModalRef.content.closeBtnName ='Close';
  }
  


  
}