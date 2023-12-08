import { Component, OnInit } from "@angular/core";
// MODAL ----- 
import { ModalController,} from "@ionic/angular";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
// INTERFACE -----
import { NavParams } from '@ionic/angular';
import { Location } from '@angular/common';
import { PessoaService } from "../pessoa.service";
import { Pessoa } from "../pessoa";

@Component({
  selector: 'app-modal-deletar-pessoas',
  templateUrl: './modal-deletar-pessoas.component.html',
  styleUrls: ['./modal-deletar-pessoas.component.scss']
})
export class ModalDeletarPessoasComponent {

  constructor(private modalcontroler:ModalController, 
    public navParams: NavParams, private service: PessoaService,
    private location: Location) { }

  exibir:Pessoa = this.navParams.get('pessoa')
  ngOnInit(): void {
  } 

  fecharModal() {
    this.modalcontroler.dismiss(); //Fecha o Modal
  }
  
  deletarPessoa() {
    this.service.deletarPessoa(this.exibir.id).subscribe({
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