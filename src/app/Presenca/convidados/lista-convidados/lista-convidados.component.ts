//ANGULAR -----
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { filter } from "rxjs";
//MODALS -----
import { ModalOptions } from 'ngx-bootstrap/modal';
import { ModalController } from "@ionic/angular";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
//SERVICE -----
import { ConvidadoService } from "./../convidado.service";
import { EventoService } from './../../eventos/evento.service';
//COMPONENT -----
import { EditarConvidadoComponent } from './../editar-convidado/editar-convidado.component';
import { NovoConvidadoComponent } from "./../novo-convidado/novo-convidado.component";
import { EditarEventoComponent } from "./../../eventos/editar-evento/editar-evento.component";
//INTERFACE -----
import { Status } from "./status";
import { Pessoa } from "./pessoa";
import { Evento } from 'src/app/Presenca/eventos/evento';


@Component({
  selector: "app-lista-convidados",
  templateUrl: "./lista-convidados.component.html",
  styleUrls: ["./lista-convidados.component.scss", "../../navbar-adm.scss"],
})
export class ListaConvidadosComponent implements OnInit {

  @Input() convidado: any;

  evento!: Evento[];
  listaStatus: Status[] = []; 
  listConvidados: Pessoa[] = [];
  filteredListConvidados: Pessoa[] = [];

  public id_evento: any;

  bsModalRef?: BsModalRef;
  constructor(
    // private modalcontroller: ModalController,
    private route: ActivatedRoute,
    private service: ConvidadoService,
    private eventService: EventoService,
    private router: Router,
    private modalService: BsModalService
    //private ser:UsuarioService
  ) {}


  ngOnInit(): void {

//PEGA_ID_DA_URL -----
    const id_evento = this.route.snapshot.paramMap.get('id');
    console.log('ID do Evento:', id_evento);



//LISTA_OS_CONVIDADOS_DO_EVENTO -----
  this.service.listConvidado().subscribe({
    next: (event) => {
      this.listConvidados = event
      console.log(this.listConvidados, event);
    }, 
    error: (error) => {
      console.log('erro: ', error);
    }
  })
}


// FUNÇÕES - EVENTO_CONVIDADO -----
  // filterList(){
  //   this.filteredListConvidados = this.listConvidados.filter((convidado) => convidado.id_evento == this.id_evento);
  // }

  addConvidado() {
    const id_evento = this.route.snapshot.paramMap.get('id');

    const requestBody = {
      id_evento: id_evento,
    }
    
    const initialState:ModalOptions = {
      initialState: {
       requestObject: requestBody,
        
      }
    }
    
    this.bsModalRef = this.modalService.show(NovoConvidadoComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  deletConvidado(id_convidado: number) {
    this.service.deletConvidado(id_convidado, this.id_evento).subscribe(() => {
      this.router.navigate([`evento_convidados/${this.id_evento}`]);
    },
    (error: any) => console.log(error))
    window.location.reload();
  }
}
