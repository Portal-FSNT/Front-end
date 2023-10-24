import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalDeletarEspacoComponent } from '../modal-deletar-espaco/modal-deletar-espaco.component';
import { Espacos } from './espacos';
import { EspacosService } from './espacos.service';

@Component({
  selector: 'app-espacos',
  templateUrl: './espacos.component.html',
  styleUrls: ['./espacos.component.scss', '../../../../styles.scss']
})
export class EspacosComponent implements OnInit {

  @Input() user: any;

  table: Espacos[] = [];

  constructor(private service: EspacosService, private modalcontroler: ModalController) { }

  ngOnInit() {
    this.service.listarEspacos().subscribe((event) => {
      this.table = event.result as Espacos[]
      console.log(this.table);
    })
  }

  exibirespacos: Espacos[] = [];


  async openModal_deletar_espaco(espaco: Espacos) {

    const modal = await this.modalcontroler.create({
      component: ModalDeletarEspacoComponent,
      componentProps: {
        espaco: espaco,
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
