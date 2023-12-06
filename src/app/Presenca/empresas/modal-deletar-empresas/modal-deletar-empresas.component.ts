// ANGULAR ----- 
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
// MODAL ----- 
import { ModalController,} from "@ionic/angular";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
// SERVICE -----
import { EmpresaService } from "./../empresa.service";
// INTERFACE -----
import { Empresa } from "../empresa";
import { NavParams } from '@ionic/angular';
import { Location } from '@angular/common';



@Component({
  selector: 'app-modal-deletar-empresas',
  templateUrl: './modal-deletar-empresas.component.html',
  styleUrls: ['./modal-deletar-empresas.component.scss']
})
export class ModalDeletarEmpresasComponent {

  constructor(private modalcontroler:ModalController, 
    public navParams: NavParams, private service: EmpresaService,
    private location: Location) { }

  exibir:Empresa = this.navParams.get('empresa')

  ngOnInit(): void {

  }

  fecharModal() {
    this.modalcontroler.dismiss(); //Fecha o Modal
  }
  
  deletarEmpresas() {

    this.service.deletarEmpresas(this.exibir.id).subscribe({
      next: (event) => {
        this.fecharModal();
        console.log(event);
        window.location.reload();
      },
      error: (error) => {
        console.error('erro: ', error);
        window.alert(error.error.message);
      }
    })
  }

}
