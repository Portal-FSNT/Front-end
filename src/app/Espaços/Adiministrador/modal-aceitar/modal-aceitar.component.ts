import { Component, OnInit } from '@angular/core';
import { Solicitacoes } from './solicitacoes';
import { NavParams } from '@ionic/angular';
import { ModalAceitarService } from './modal-aceitar.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-aceitar',
  templateUrl: './modal-aceitar.component.html',
  styleUrls: ['./modal-aceitar.component.scss']
})
export class ModalAceitarComponent implements OnInit {
  
  constructor(private modalcontroler:ModalController, public navParams: NavParams, private service: ModalAceitarService) { }
  
  exibirSolicitacao:Solicitacoes = this.navParams.get('solicitacao')

  ngOnInit(): void {
  }

  fecharModal() {
    window.location.reload()
  }

  deniSolicitacao(id: number) {
    // this.service.deniSolicitacao(id).subscribe((event) => {
    //   console.log(event)
    // });
    this.service.deniSolicitacao(id).subscribe({
      next: (event) => {
        window.location.reload();
        console.log(event);
      },
      error: (error) => {
        console.log('erro: ', error);
      }
    })
  }

  aceptSolicitacao(id: number) {
    // this.service.aceptSolicitacao(id).subscribe((event) => {
    //   console.log(event)
    // });
    this.service.aceptSolicitacao(id).subscribe({
      next: (event) => {
        window.location.reload();
        console.log(event);
      },
      error: (error) => {
        console.log('erro: ', error);
      }
    })
  }
}
