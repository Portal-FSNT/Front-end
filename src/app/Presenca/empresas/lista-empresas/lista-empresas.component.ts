// ANGULAR ----- 
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
// MODAL ----- 
import { ModalController,} from "@ionic/angular";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
// COMPONENT -----
import { EditarEmpresaComponent } from "./../editar-empresa/editar-empresa.component";
import { NovaEmpresaComponent } from "./../nova-empresa/nova-empresa.component";
// SERVICE -----
import { EmpresaService } from "./../empresa.service";
// INTERFACE -----
import { Empresa } from "../empresa";
import { ModalDeletarEmpresasComponent } from '../modal-deletar-empresas/modal-deletar-empresas.component';


@Component({
  selector: "app-lista-empresas",
  templateUrl: "./lista-empresas.component.html",
  styleUrls: ["./lista-empresas.component.scss"],
})
export class ListaEmpresasComponent implements OnInit {
  listaEmpresa: Empresa[] = [];

  constructor(
    private service: EmpresaService,
    private modalController: ModalController,
    private router: Router,
    private modalService: BsModalService
    //private ser:UsuarioService
  ) {}

  ngOnInit(): void {
    // this.service.listar().subscribe((event) => {
    //   this.listaEmpresa = event.result as Empresa[];
    //   console.log(this.listaEmpresa);
    // });
    this.service.listar().subscribe({
      next: (event) => {
        this.listaEmpresa = event
        console.log(this.listaEmpresa, event);
      },
      error: (error) => {
        console.log('erro: ', error);
      }
    })
  }

  async add() {
    const modal = await this.modalController.create({
      component: NovaEmpresaComponent,
      cssClass: "modal",
    });
    await modal.present();
  }

  
bsModalRef?: BsModalRef;
novoEmpresa(){
  this.bsModalRef = this.modalService.show(NovaEmpresaComponent);
  this.bsModalRef.content.closeBtnName = 'Close';
}

editarEmpresa(empresa: any){
  const id_empresa = empresa.id;
  const nome = empresa.nome
  const initialState: ModalOptions = {
    initialState:{
      list: [
        id_empresa,
        nome,
      ],
      title: 'Modal Update Empresa'
    }
  };

  this.bsModalRef = this.modalService.show(EditarEmpresaComponent, initialState);
  this.bsModalRef.content.closeBtnName = 'Close';
  return id_empresa;
}

async openModal_deletar_empresa(empresa: Empresa) {

  const modal = await this.modalController.create({
    component: ModalDeletarEmpresasComponent,
    componentProps: {
      empresa: empresa,
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
