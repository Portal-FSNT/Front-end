import { Component, OnInit, Input } from '@angular/core';
import { SolicitacoesConfirmadasService } from './solicitacoes-confirmadas.service';
import { SolicitacoesConfirmadas } from './solicitacoes-confirmadas';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController,} from "@ionic/angular";
import { ModalDeletarSolicitacoesComponent } from './../modal-deletar-solicitacoes/modal-deletar-solicitacoes.component';



@Component({
  selector: 'app-solicitacoes-confirmadas',
  templateUrl: './solicitacoes-confirmadas.component.html',
  styleUrls: ['./solicitacoes-confirmadas.component.scss', '../../../../styles.scss']
})
export class SolicitacoesConfirmadasComponent implements OnInit {

  table:SolicitacoesConfirmadas[] = [];

  constructor(
    private service: SolicitacoesConfirmadasService,
    private router: Router, 
    private modalController: ModalController,


  ) { }

  ngOnInit() {
      this.service.listarSolicitacoesConfirmadas().subscribe({
        next: (event) => {
          this.table = event
          console.log(this.table, event);
        }, 
        error: (error) => {
          console.log('erro: ', error);
        }
      })
  }

  async openModal_deletar_solicitacao(solicitacao: SolicitacoesConfirmadas) {

    const modal = await this.modalController.create({
      component: ModalDeletarSolicitacoesComponent,
      componentProps: {
        solicitacao: solicitacao,
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