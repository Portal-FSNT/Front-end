import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Modal4Component } from '../modal4/modal4.component';
import { Espaco } from './espaco';
import { EspacosNovoService } from './espacos-novo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-espacos-novo',
  templateUrl: './espacos-novo.component.html',
  styleUrls: ['./espacos-novo.component.scss', '../../../../styles.scss']
})
export class EspacosNovoComponent implements OnInit {

  espaco:Espaco = {
    nome: "",
    ponto_referencia: "",
    descricao: "",
  }

  constructor(private modalcontroler:ModalController,
    private service: EspacosNovoService,
    private router: Router) {}
    async openModal4(){
      const modal = await this.modalcontroler.create({
        component: Modal4Component,
        cssClass: 'modal4'
      });
      await modal.present();
      const res = await modal.onDidDismiss();
    }

    ngOnInit(): void {

    }

    cadastrarEspaco(){

      // Valida se os inputs estão preenchidos
      if(this.espaco.nome === ""
      ||this.espaco.ponto_referencia === ""
      ||this.espaco.descricao === "")
      return;
  
      this.service.cadastrarEspaco(this.espaco).subscribe((event) => {
        console.log(event)
  
        this.router.navigate(['/espacos']);
      })
    }



}
