import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Evento } from './evento';
import { EventoService } from './evento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AlterarEventoComponent } from './../alterar-evento/alterar-evento.component';
import { ModalDeletarEventosComponent } from './../modal-deletar-eventos/modal-deletar-eventos.component';




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
  
  updateEvento(card: any){
    const id = card.id;
    const nome = card.nome;
    const descricao = card.descricao;
    const data_evento = card.data_evento;
    const hora_inicio = card.hora_inicio;
    const hora_termino = card.hora_termino;
    const endereco = card.endereco;
    const id_espaco = card.data_evento;
    const tipo_evento = card.hora_inicio;
    const modalidade = card.hora_termino;
    console.log(card.id)

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
  
  async openModal_deletar_evento(evento: Evento) {

    const modal = await this.modalController.create({
      component: ModalDeletarEventosComponent,
      componentProps: {
        evento: evento,
      },
      cssClass: 'modal_deletar_espaco'
    });
    await modal.present();
    // Recarrega a página ao fechar o modal
    if (await modal.onDidDismiss()) {
      this.ngOnInit()
    }
  }

  
}