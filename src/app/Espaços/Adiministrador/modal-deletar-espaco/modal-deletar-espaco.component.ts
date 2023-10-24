import { Component, OnInit } from '@angular/core';
import { Espacos } from './espacos';
import { NavParams } from '@ionic/angular';
import { ModalDeletarEspacosService } from './modal-deletar-espaco.service';
import { ModalController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modal-deletar-espaco',
  templateUrl: './modal-deletar-espaco.component.html',
  styleUrls: ['./modal-deletar-espaco.component.scss']
})
export class ModalDeletarEspacoComponent implements OnInit {

  constructor(private modalcontroler:ModalController, 
    public navParams: NavParams, private service: ModalDeletarEspacosService,
    private location: Location) { }

  exibirEspaco:Espacos = this.navParams.get('espaco')

  ngOnInit(): void {

  }

  fecharModal() {
    this.modalcontroler.dismiss(); //Fecha o Modal
  }
  
  deletarEspaco() {
    this.service.deletarEspaco(this.exibirEspaco.id).subscribe((event) => {
      console.log(event)
      this.fecharModal()
      window.location.reload(); // Recarrega a página

      // Solicitante
      if(event.message === "Espaço removido com sucesso") {
      }
    })
  }

}
