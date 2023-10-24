import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-aviso',
  templateUrl: './modal-aviso.component.html',
  styleUrls: ['./modal-aviso.component.scss']
})
export class ModalAvisoComponent {

  // Recarregar a página quando fechar o modal
  fecharModal(){
    window.location.reload();
  }
}
