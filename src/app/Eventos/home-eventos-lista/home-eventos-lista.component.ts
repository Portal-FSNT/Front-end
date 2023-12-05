import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Evento } from './../home-eventos/evento';
import { EventoService } from './../home-eventos/evento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AlterarEventoComponent } from './../alterar-evento/alterar-evento.component';
import { AltEventosService } from './../alterar-evento/alt-eventos.service';
import { ModalDeletarEventosComponent } from './../modal-deletar-eventos/modal-deletar-eventos.component';



@Component({
  selector: 'app-home-eventos-lista',
  templateUrl: './home-eventos-lista.component.html',
  styleUrls: ['./home-eventos-lista.component.scss']
})
export class HomeEventosListaComponent {

  @Input() user: any;
  
  eventos: Evento[] = [];
  exibir: Evento[] = [];


  constructor(
    private modalController:ModalController, 
    private service: EventoService, 
    private router: Router, 
    private route: ActivatedRoute,
    private altEventosService: AltEventosService,
    private EventoService: EventoService,
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private modalcontroler: ModalController

    
    ) { }

  ngOnInit() {
    this.service.listarEvento().subscribe((event) => {
      this.eventos = event
      console.log(this.eventos);
    });
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
        this.router.navigate(["/eventos-lista"]);
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

  onDelete() {
    const eventId = +this.route.snapshot.params['id'];
    this.router.navigate(['/eventos']);
    this.altEventosService.deletarEvento(eventId).subscribe(
      response => {
        console.log('Evento excluído com sucesso!', response);
      },
      error => {
        console.error('Erro ao excluir o evento', error);
      }
    );
  }

  async openModal_deletar_evento(evento: Evento) {

    const modal = await this.modalcontroler.create({
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
