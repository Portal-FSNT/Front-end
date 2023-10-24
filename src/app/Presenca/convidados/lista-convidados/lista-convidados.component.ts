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
    this.route.paramMap.subscribe(paramMap => {
      this.id_evento = paramMap.get('id');
      console.log('ID do Evento: '+this.id_evento);
    })

//LISTA_OS_CONVIDADOS_DO_EVENTO -----
    this.service.listConvidado().subscribe((event) => {
      this.listConvidados = event.result as Pessoa[];
      this.filterList();
      console.log('Lista de convidados: '+JSON.stringify(this.filteredListConvidados));
    });

//LISTA_STATUS -----
    this.service.listarStatus(this.id_evento).subscribe((event) => {
        this.listaStatus = event.results as Status[];
        console.log('----- Listar Status -----');
        console.log('API Response: '+event.results);
        console.log('Status: '+this.listaStatus); 
    });

//PEGA_OS_REGISTROS_D0_EVENTO -----
    this.eventService.listarUm(this.id_evento).subscribe((event)=>{
      this.evento = event.result as Evento[];
      console.log('Evento: '+JSON.stringify(this.evento));
    })

  }

// FUNÇÕES - EVENTO -----
  updateEvento(edtEvento: any) {
    const id = this.id_evento;
    const data_hora = edtEvento.data_hora;
    const descricao = edtEvento.descricao;

    const initialState:ModalOptions = {
      initialState:{
        list:[
          id,
          data_hora,
          descricao,
        ],
      }
    }

    //console.log('Evento: '+JSON.stringify(initialState));

    this.bsModalRef = this.modalService.show(EditarEventoComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  deletEvento() {
    console.log(this.id_evento);
    console.log(`o id 'e ${this.id_evento}`)
    this.service.delet(this.id_evento).subscribe(() => {
      this.router.navigate(["/-lista-eventos"]);
    });
  }

// FUNÇÕES - EVENTO_CONVIDADO -----
  filterList(){
    this.filteredListConvidados = this.listConvidados.filter((convidado) => convidado.id_presenca == this.id_evento);
  }

  getStatusLabel(valor: number): string {
    return valor === 1 ? 'Sim' : 'Não';
  }  

  addConvidado() {
    const id_evento = this.id_evento;

    const initialState:ModalOptions = {
      initialState: {
        id_evento,
      }
    }
    this.bsModalRef = this.modalService.show(NovoConvidadoComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  updateConvidado(convidado: Pessoa){
    const id_evento = convidado.id_presenca;
    const id_convidado = convidado.id_convidado;
    const condicao = convidado.condicao;
    const anunciado = convidado.anunciado;
    const presenca = convidado.presenca;

    const initialState:ModalOptions = {
      initialState:{
        list:[
          id_evento,
          id_convidado,
          condicao,
          anunciado,
          presenca,
        ]
      }
    }

    this.bsModalRef = this.modalService.show(EditarConvidadoComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close'
  }

  deletConvidado(id_convidado: number) {
    this.service.deletConvidado(id_convidado, this.id_evento).subscribe(() => {
      this.router.navigate([`evento_convidados/${this.id_evento}`]);
    },
    (error: any) => console.log(error))
    window.location.reload();
  }
}

//PROJETO_ORIGINAL - DENTRO DO ngOnInit(){} ------
    // this.service.listarStatus(this.id_evento).subscribe((event) => {
    //   console.log(event.result)
    //   if (event.result[0].total !== '0') {

    //     this.listaStatus = event.result as any;

    //     this.service.listConvidado(this.id_evento).subscribe((event) => {
    //       this.listConvidados = event.result as any;
    //     });
    //   }

    //   this.eventoService.listarUm(this.id_evento).subscribe((event) => {
    //     this.listaEvento = event.result;
    //     console.log(event.result)
    //   })
    //   console.log('Arroz '+this.listConvidados);
    //   console.log('Feijão '+this.id_evento);
    //   console.log('Ovo Frito '+this.listaStatus);
    // });

    // this.eventoService.listarUm(this.id_evento).subscribe((event) => {
    //   this.listaEventos = event.result as any;
    // })

//PROJETO_ORIGINAL - MODAL_EDITAR_EVENTO -----
    // async edit(
    // ) {
    //   const modal = await this.modalcontroller.create({
    //     component: EditarEventoComponent,
    //     //  id_eventos:any = this.id_evento,
    //     componentProps: {
    //       id_evento: this.id_evento

    //     },

    //     cssClass: "modal",

    //   });
    //   console.log(`o id 'e ${this.id_evento}`)
    //   await modal.present();
    // }
    // async edit(){
    //   const modal= await this.modalcontroller.create({
    //     component:EditarEventoComponent,

    //     componentProps:{this.id_evento,this.evento,

    //     },
    //     cssClass:"modal",
    //   });
    //   await modal.present();

    // }

//PROJETO_ORIGINAL - MODAL_EDITAR_CONVIDADO -----
    // async editConvidado(id_evento:number, id_convidado:number, condicao:string, anunciado:number, presenca:number) {
    //   const modal = await this.modalcontroller.create({
    //     component: EditarConvidadoComponent,
    //     cssClass: "modal",
    //     componentProps: {
    //         id_evento: id_evento,
    //         id_convidado: id_convidado,
    //         condicao: condicao,
    //         anunciado: anunciado,
    //         presenca: presenca,
    //     }
    //   })
    //   await modal.present();
    // }