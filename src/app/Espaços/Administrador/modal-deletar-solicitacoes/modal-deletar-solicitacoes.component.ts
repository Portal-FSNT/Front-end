import { Component, OnInit } from "@angular/core";
// MODAL ----- 
import { ModalController,} from "@ionic/angular";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
// INTERFACE -----
import { NavParams } from '@ionic/angular';
import { Location } from '@angular/common';
import { SolicitacoesConfirmadasService } from './solicitacoes-confirmadas.service';
import { SolicitacoesConfirmadas } from './solicitacoes-confirmadas';

@Component({
  selector: 'app-modal-deletar-solicitacoes',
  templateUrl: './modal-deletar-solicitacoes.component.html',
  styleUrls: ['./modal-deletar-solicitacoes.component.scss']
})
export class ModalDeletarSolicitacoesComponent {

  constructor(private modalcontroler:ModalController, 
    public navParams: NavParams, private service: SolicitacoesConfirmadasService,
    private location: Location) { }

  exibir:SolicitacoesConfirmadas = this.navParams.get('solicitacao')
  ngOnInit(): void {
  } 

  fecharModal() {
    this.modalcontroler.dismiss(); //Fecha o Modal
  }
  
  deletarSolicitacao() {
    this.service.deletarSolicitacao(this.exibir.id).subscribe({
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


